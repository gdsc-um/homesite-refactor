/*
  Warnings:

  - Made the column `role_tim` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role_tim` ENUM('LEAD', 'COM_ADV', 'AFM', 'CORETIM') NOT NULL DEFAULT 'CORETIM';
