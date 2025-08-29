/*
  Warnings:

  - You are about to drop the column `compareAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productQuantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productSize` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "compareAt",
DROP COLUMN "price",
DROP COLUMN "productQuantity",
DROP COLUMN "productSize";
