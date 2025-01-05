-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `Questions_quizId_fkey`;

-- DropIndex
DROP INDEX `Questions_quizId_fkey` ON `questions`;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
