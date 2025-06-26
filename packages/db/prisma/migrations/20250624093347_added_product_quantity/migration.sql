/*
  Warnings:

  - Added the required column `productQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `tags` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productQuantity" TEXT NOT NULL,
ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "productSize" DROP DEFAULT;
