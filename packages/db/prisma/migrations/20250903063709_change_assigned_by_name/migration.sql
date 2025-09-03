/*
  Warnings:

  - You are about to drop the column `assignedBy` on the `GrowVatika_Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."GrowVatika_Admin" DROP COLUMN "assignedBy",
ADD COLUMN     "assignedByAdminId" TEXT NOT NULL DEFAULT '';
