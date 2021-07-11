/*
  Warnings:

  - You are about to drop the column `ShippingId` on the `Partner` table. All the data in the column will be lost.
  - Added the required column `shippingId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "ShippingId",
ADD COLUMN     "shippingId" INTEGER NOT NULL;
