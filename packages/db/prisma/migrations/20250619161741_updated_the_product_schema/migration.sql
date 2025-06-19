/*
  Warnings:

  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `collection` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productStatus` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `visibility` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL,
DROP COLUMN "collection",
ADD COLUMN     "collection" TEXT NOT NULL,
DROP COLUMN "productStatus",
ADD COLUMN     "productStatus" TEXT NOT NULL,
DROP COLUMN "visibility",
ADD COLUMN     "visibility" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "Collection";

-- DropEnum
DROP TYPE "ProductStatus";

-- DropEnum
DROP TYPE "Visibility";
