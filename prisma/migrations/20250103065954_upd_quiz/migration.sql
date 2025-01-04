/*
  Warnings:

  - Added the required column `quizType` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quiz` ADD COLUMN `quizType` ENUM('WEB', 'MOBILE', 'ML', 'UIUX', 'OTHER') NOT NULL;
