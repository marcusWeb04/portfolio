<?php 

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/api/projects/edit', name: 'api_project_edit', methods: ['PUT'])]
    public function editProject(Request $request,ProjectRepository $projectRepository,CategoryRepository $categoryRepository,EntityManagerInterface $entityManager): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        if (!empty($data['title'])) {
            $project->setTitle($data['title']);
        }

        if (!empty($data['link'])) {
            $project->setLink($data['link']);
        }

        if (!empty($data['description'])) {
            $project->setDescription($data['description']);
        }

        $entityManager->flush();

        return $this->json($project, 200, [], ['groups' => 'project:read']);
    }
}