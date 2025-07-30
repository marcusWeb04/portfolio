<?php

namespace App\DataFixtures;

use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProjectFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $projects = [
            [
                "title"=> "Portfolio",
                "description"=>"",
                "link" => "https://github.com/marcusWeb04/portfolio"
            ],
        ];
        
        foreach($projects as $element){
            $project = new Project();
            $project->setTitle($element["title"]);
            $project->setLink($element["link"]);
            $project->setDescription($element["description"]);
            $manager->persist($project);
        }
        $manager->flush();
    }
    
    public function getDependencies(): array
    {
        return [
            TaskFixtures::class,
            CategoryFixtures::class,
        ];
    }
}
