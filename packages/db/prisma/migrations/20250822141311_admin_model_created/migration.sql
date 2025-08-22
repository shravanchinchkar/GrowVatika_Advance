-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isAdminVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "isAdminVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "GrowVatika_Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "GrowVatika_Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GrowVatika_Admin_email_key" ON "GrowVatika_Admin"("email");
