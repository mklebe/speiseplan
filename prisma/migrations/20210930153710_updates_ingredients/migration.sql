/*
  Warnings:

  - You are about to drop the column `quantity` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Ingredient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "quantity",
DROP COLUMN "unit";
