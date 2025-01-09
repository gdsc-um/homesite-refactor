/*
  Warnings:

  - Added the required column `profil_bevy` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `profil_bevy` VARCHAR(191) NOT NULL;
