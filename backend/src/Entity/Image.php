<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ImageRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[Vich\Uploadable]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["private"])]
    private ?int $id = null;

    #[Groups(["public"])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    // Fichier pour l'upload
    #[Groups(["private"])]
    #[Vich\UploadableField(mapping: 'images', fileNameProperty: 'fileName')]
    private ?File $file = null;

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

    #[Groups(['public'])]
    public function getImageUrl(): ?string
    {
        return $this->name ? '/uploads/images/' . $this->name : null;
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

    
    public function setFile(?File $file = null): void
    {
        $this->file = $file;

        if ($file) {
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getFile(): ?File
    {
        return $this->file;
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
