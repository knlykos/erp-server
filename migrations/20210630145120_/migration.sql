/*
  Warnings:

  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fixedShift` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "department_fixedShiftId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmentId_fkey";

-- DropTable
DROP TABLE "department";

-- DropTable
DROP TABLE "employee";

-- DropTable
DROP TABLE "fixedShift";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL DEFAULT E'',
    "code" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "barcode" VARCHAR(20) NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "cost" DECIMAL(12,2) NOT NULL,
    "image" TEXT NOT NULL,
    "canBeSold" BOOLEAN NOT NULL,
    "canBePurchace" BOOLEAN NOT NULL,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "barcode" VARCHAR(20) NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "userRole" INTEGER,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "firstname" VARCHAR(20),
    "lastname" VARCHAR(30),
    "businessTitle" VARCHAR(255),
    "timeType" INTEGER,
    "phone" VARCHAR(15),
    "street" VARCHAR(40),
    "apartment" VARCHAR(10),
    "city" VARCHAR(20),
    "state" VARCHAR(20),
    "zipCode" VARCHAR(10),
    "hireDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateBirth" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "departmentId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "userRole" INTEGER,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "firstname" VARCHAR(20),
    "lastname" VARCHAR(30),
    "businessTitle" VARCHAR(255),
    "timeType" INTEGER,
    "phone" VARCHAR(15),
    "street" VARCHAR(40),
    "city" VARCHAR(20),
    "state" VARCHAR(20),
    "zipCode" VARCHAR(10),
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee.username_unique" ON "Employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Employee.email_unique" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Location" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
