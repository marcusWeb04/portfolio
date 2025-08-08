<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class JWTCreatedListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $token = $event->getData()['token'];

        $response = $event->getResponse();
        $response->headers->setCookie(
            Cookie::create('BEARER', $token)
                ->withHttpOnly(true)
                ->withSecure(false) // assure-toi que tu es en HTTPS
                ->withSameSite('Lax') // ou 'Lax' selon ton besoin
                ->withExpires(new \DateTime('+15 minutes'))
        );
        $event->setData([]);
    }
}
