<?php

namespace App\Controller;

use App\Repository\ProjectRepository;
use App\Repository\CategoryRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController
{
    #[Route('/api/projects/find', name: "api_projects_by_category", methods: ['POST'])]
    public function listTypeProjects(ProjectRepository $repository, CategoryRepository $categoryRepository, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        if (!isset($data['categories'])) {
            return $this->json(['error' => 'Paramètre categories manquant'], 400);
        }
    
        $limit = isset($data['limit']) ? (int)$data['limit'] : 7;
    
        if ($data['categories'] === 'Tout') {
            $projects = $repository->findAll();
            return $this->json($projects, 200, [], ['groups' => 'public']);
        }
    
        // Trouver la catégorie demandée
        $category = $categoryRepository->findOneBy(['name' => $data['categories']]);
        if (!$category) {
            return $this->json(['error' => 'Catégorie inconnue'], 400);
        }
    
        // Supposons que findByCategory accepte un paramètre $limit
        $projects = $repository->findByCategory($category, $limit);
    
        return $this->json($projects, 200, [], ['groups' => 'public']);
    }

    #[Route('/api/project/info', name:"api_projects_pagination", methods:['POST'])]
    public function paginationProjects(ProjectRepository $repository, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $limit = $data['limit'] ?? 7;
        $page = $data['page'] ?? 1;
        
        $offset = ($page - 1) * $limit;
        
        $projects = $repository->findWithPagination($limit, $offset);
        
        return $this->json($projects, 200, [], ['groups' => 'public']);
        
    }

    #[Route('/api/project/create', name: "api_project_create", methods: ['POST'])]
    public function createProject(Request $request,EntityManagerInterface $entityManager,CategoryRepository $categoryRepository): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }

        // Validation simple
        if (empty($data['title']) || empty($data['link']) || empty($data['description'])) {
            return $this->json(['error' => 'Missing required fields'], 400);
        }

        $project = new Project();
        $project->setTitle($data['title']);
        $project->setLink($data['link']);
        $project->setDescription($data['description']);

        // Gérer les catégories (facultatif)
        if (!empty($data['category_ids']) && is_array($data['category_ids'])) {
            foreach ($data['category_ids'] as $categoryId) {
                $category = $categoryRepository->find($categoryId);
                if ($category) {
                    $project->addCategory($category);
                }
            }
        }

        $entityManager->persist($project);
        $entityManager->flush();

        return $this->json($project, 201, [], ['groups' => 'project:read']);
    }

    #[Route('/api/project/edit/{id}', name: 'api_project_edit', methods: ['PUT'])]
    public function editProject(int $id,Request $request,ProjectRepository $projectRepository,CategoryRepository $categoryRepository,EntityManagerInterface $entityManager): JsonResponse 
    {
        $project = $projectRepository->find($id);

        if (!$project) {
            return $this->json(['error' => 'Project not found'], 404);
        }

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

        // Gestion des catégories
        if (isset($data['category_ids']) && is_array($data['category_ids'])) {
            $project->getCategories()->clear(); // Supprimer les anciennes
            foreach ($data['category_ids'] as $categoryId) {
                $category = $categoryRepository->find($categoryId);
                if ($category) {
                    $project->addCategory($category);
                }
            }
        }

        $entityManager->flush();

        return $this->json($project, 200, [], ['groups' => 'project:read']);
    }

    #[Route('/api/project/delete/{id}', name: 'api_project_delete', methods: ['DELETE'])]
    public function deleteProject( int $id, ProjectRepository $projectRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $project = $projectRepository->find($id);

        if (!$project) {
            return $this->json(['error' => 'Project not found'], 404);
        }

        $entityManager->remove($project);
        $entityManager->flush();

        return $this->json(['message' => 'Project deleted'], 200);
    }
}
