<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = [
            [
                "title" => "projet personelle",
            ],
            [
                "title" => "projet professionelle",
            ],
            [
                "title" => "Preuve de concepte",
            ],
            [
                "title" => "Projet encadrée",
            ]
        ];
        
        foreach($categories as $element){
            $category = new Category();
            $category->setName($element['title']);
            $manager->persist($category);
        }
        
        $manager->flush();
    }
}
