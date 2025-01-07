-- AlterTable
ALTER TABLE `article` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `questions` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `avatar` VARCHAR(191) NULL;
