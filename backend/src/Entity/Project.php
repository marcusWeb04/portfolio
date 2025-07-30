<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["public", "private"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["public", "private"])]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(["public", "private"])]
    private ?string $link = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["public", "private"])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(["public", "private"])]
    private ?Image $image = null;

    /**
     * @var Collection<int, Stack>
     */
    #[ORM\ManyToMany(targetEntity: Stack::class, mappedBy: 'projects')]
    private Collection $stacks;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\ManyToMany(targetEntity: Category::class, mappedBy: 'projects')]
    private Collection $categories;

    public function __construct()
    {
        $this->stacks = new ArrayCollection();
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): static
    {
        $this->link = $link;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): static
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return Collection<int, Stack>
     */
    public function getStacks(): Collection
    {
        return $this->stacks;
    }

    public function addStack(Stack $stack): static
    {
        if (!$this->stacks->contains($stack)) {
            $this->stacks->add($stack);
            $stack->addProject($this);
        }

        return $this;
    }

    public function removeStack(Stack $stack): static
    {
        if ($this->stacks->removeElement($stack)) {
            $stack->removeProject($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->addProject($this);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        if ($this->categories->removeElement($category)) {
            $category->removeProject($this);
        }

        return $this;
    }
}
