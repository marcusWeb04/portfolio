<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250731091020 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category_project (category_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_E86B909012469DE2 (category_id), INDEX IDX_E86B9090166D1F9C (project_id), PRIMARY KEY(category_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, link VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, image_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, link VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, INDEX IDX_2FB3D0EE3DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stack (id INT AUTO_INCREMENT NOT NULL, logo_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_41A87B6AF98F144A (logo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stack_project (stack_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_6463EB4B37C70060 (stack_id), INDEX IDX_6463EB4B166D1F9C (project_id), PRIMARY KEY(stack_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category_project ADD CONSTRAINT FK_E86B909012469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE category_project ADD CONSTRAINT FK_E86B9090166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE3DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE stack ADD CONSTRAINT FK_41A87B6AF98F144A FOREIGN KEY (logo_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE stack_project ADD CONSTRAINT FK_6463EB4B37C70060 FOREIGN KEY (stack_id) REFERENCES stack (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE stack_project ADD CONSTRAINT FK_6463EB4B166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_project DROP FOREIGN KEY FK_E86B909012469DE2');
        $this->addSql('ALTER TABLE category_project DROP FOREIGN KEY FK_E86B9090166D1F9C');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE3DA5256D');
        $this->addSql('ALTER TABLE stack DROP FOREIGN KEY FK_41A87B6AF98F144A');
        $this->addSql('ALTER TABLE stack_project DROP FOREIGN KEY FK_6463EB4B37C70060');
        $this->addSql('ALTER TABLE stack_project DROP FOREIGN KEY FK_6463EB4B166D1F9C');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE category_project');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE stack');
        $this->addSql('DROP TABLE stack_project');
        $this->addSql('DROP TABLE `user`');
    }
}
