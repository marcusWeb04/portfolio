<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JwtCookieAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private JWTTokenManagerInterface $jwtManager
    ) {}

    public function supports(Request $request): bool
    {
        // Ignore les requêtes préflight CORS
        if ($request->getMethod() === 'OPTIONS') {
            return false;
        }

        // On ne supporte que si le cookie est présent
        return $request->cookies->has('BEARER');
    }

    public function authenticate(Request $request): SelfValidatingPassport
    {
        $token = $request->cookies->get('BEARER');

        if (!$token) {
            throw new AuthenticationException('JWT token not found in cookie');
        }

        $payload = $this->jwtManager->parse($token);

        if (!$payload || !isset($payload['username'])) {
            throw new AuthenticationException('Invalid JWT token payload');
        }

        return new SelfValidatingPassport(
            new UserBadge($payload['username'])
        );
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new Response(
            json_encode(['message' => 'Authentication failed: ' . $exception->getMessage()]),
            Response::HTTP_UNAUTHORIZED,
            ['Content-Type' => 'application/json']
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Authentification réussie → continuer sans interruption
        return null;
    }
}
