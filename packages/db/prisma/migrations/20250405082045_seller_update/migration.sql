/*
  Warnings:

  - You are about to drop the column `city` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "city",
DROP COLUMN "ownerName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
