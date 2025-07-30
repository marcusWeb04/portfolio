<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $link = null;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'Image')]
    private Collection $projects;

    /**
     * @var Collection<int, Stack>
     */
    #[ORM\OneToMany(targetEntity: Stack::class, mappedBy: 'logo')]
    private Collection $Stacks;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->Stacks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setImage($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getImage() === $this) {
                $project->setImage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stack>
     */
    public function getStacks(): Collection
    {
        return $this->Stacks;
    }

    public function addStack(Stack $Stack): static
    {
        if (!$this->Stacks->contains($Stack)) {
            $this->Stacks->add($Stack);
            $Stack->setLogo($this);
        }

        return $this;
    }

    public function removeStack(Stack $Stack): static
    {
        if ($this->Stacks->removeElement($Stack)) {
            // set the owning side to null (unless already changed)
            if ($Stack->getLogo() === $this) {
                $Stack->setLogo(null);
            }
        }

        return $this;
    }
}
