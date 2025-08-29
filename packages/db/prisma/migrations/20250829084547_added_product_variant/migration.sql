-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "scientificName" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "public"."ProductSizeVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "compareAt" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductSizeVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ProductSizeVariant" ADD CONSTRAINT "ProductSizeVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
