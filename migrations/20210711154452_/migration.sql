/*
  Warnings:

  - Added the required column `tax` to the `OrderLine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderLine" ADD COLUMN     "tax" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "SaleOrder" ALTER COLUMN "note" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
