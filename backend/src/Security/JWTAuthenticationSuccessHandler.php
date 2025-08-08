<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\HttpFoundation\Request;

class JWTAuthenticationSuccessHandler implements AuthenticationSuccessHandlerInterface, EventSubscriberInterface
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager,
        private string $cookieName = 'BEARER',
        private int $cookieLifetime = 3600,
        private bool $cookieSecure = false, // true en prod
        private string $cookieSameSite = 'Lax'
    ) {}

    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            throw new \RuntimeException('Invalid user type');
        }

        // Générer le token JWT
        $jwt = $this->jwtManager->create($user);

        // Créer le cookie
        $cookie = Cookie::create($this->cookieName)
            ->withValue($jwt)
            ->withExpires(time() + $this->cookieLifetime)
            ->withPath('/')
            ->withSecure($this->cookieSecure)
            ->withHttpOnly(true)
            ->withSameSite($this->cookieSameSite);

        // Créer la réponse
        $response = new JsonResponse([
            'code' => 204,
            'message' => 'Authentication successful',
        ]);

        $response->headers->setCookie($cookie);

        return $response;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onJWTCreated',
        ];
    }

    public function onJWTCreated(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $user = $event->getUser();

        // Ajouter des données personnalisées dans le payload JWT
        if (method_exists($user, 'getId')) {
            $data['user_id'] = $user->getId();
        }

        $event->setData($data);
    }
}
