<?php 

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/api/me', name: 'api_me', methods: ['POST'])]
    public function me(Security $security): JsonResponse
    {
        $user = $security->getUser();
    
        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }
    
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            // autres infos utiles
        ]);
    }


    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): Response
    {
        $response = new Response();
        $response->headers->clearCookie('BEARER', '/', null, true, true, 'Strict');

        return $response;
    }
}