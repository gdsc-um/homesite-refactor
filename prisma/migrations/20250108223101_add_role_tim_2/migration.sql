/*
  Warnings:

  - You are about to drop the column `role_time` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_time`,
    ADD COLUMN `role_tim` VARCHAR(191) NULL;
