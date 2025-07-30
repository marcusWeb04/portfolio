<?php

namespace App\DataFixtures;

use App\Entity\Stack;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class StackFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $tasks = [
            [
                "name" => "HTML",
            ],
            [
                "name" => "CSS",
            ],
            [
                "name" => "JS",
            ],
            [
                "name" => "PHP",
            ],
            [
                "name" => "PYTHON"
            ],
            [
                "name" => "C#",
            ],
            [
                "name" => "Symfony",
            ],
            [
                "name" => "React",
            ],
            [
                "name" => "MySql"
            ],
        ];
        
        foreach($tasks as $element){
            $task = new Stack();
            $task->setName($element["name"]);
            $manager->persist($task);
        }
        $manager->flush();
    }
    
    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}
