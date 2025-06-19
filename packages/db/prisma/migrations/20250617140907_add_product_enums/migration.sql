/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collection` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productStatus` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Collection" AS ENUM ('INDOOR', 'OUTDOOR', 'FLOWERING_PLANTS', 'TROPICAL_PLANTS');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PLANTS', 'POTS', 'SOIL', 'FERTILIZERS');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'HIDDEN');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "collection" "Collection" NOT NULL,
ADD COLUMN     "productStatus" "ProductStatus" NOT NULL,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "visibility" "Visibility" NOT NULL;
