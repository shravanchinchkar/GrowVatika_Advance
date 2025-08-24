/*
  Warnings:

  - You are about to drop the column `firstName` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT '';
