/*
  Warnings:

  - Added the required column `quantity` to the `OrderLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderLine" ADD COLUMN     "quantity" DECIMAL(12,2) NOT NULL;

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    PRIMARY KEY ("id")
);
