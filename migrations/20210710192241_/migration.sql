/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barcode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "SaleOrder" (
    "id" SERIAL NOT NULL,
    "orderReference" TEXT NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" SERIAL NOT NULL,
    "salesOrderId" INTEGER NOT NULL,
    "purchaseOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "street" VARCHAR(250) NOT NULL,
    "zip" VARCHAR(10) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "mobile" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "website" VARCHAR(150) NOT NULL,
    "ShippingId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WherehouseMovement" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "movType" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL,
    "unitOfMessure" INTEGER NOT NULL,
    "company" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToWherehouseMovement" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToWherehouseMovement_AB_unique" ON "_ProductToWherehouseMovement"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToWherehouseMovement_B_index" ON "_ProductToWherehouseMovement"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Product.name_unique" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product.code_unique" ON "Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Product.barcode_unique" ON "Product"("barcode");

-- AddForeignKey
ALTER TABLE "OrderLine" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD FOREIGN KEY ("salesOrderId") REFERENCES "SaleOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWherehouseMovement" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWherehouseMovement" ADD FOREIGN KEY ("B") REFERENCES "WherehouseMovement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
