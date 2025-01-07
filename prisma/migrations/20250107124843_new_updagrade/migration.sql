/*
  Warnings:

  - You are about to drop the column `authorId` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_authorId_fkey`;

-- DropIndex
DROP INDEX `Article_authorId_fkey` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `authorId`,
    DROP COLUMN `image`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Article_slug_key` ON `Article`(`slug`);
