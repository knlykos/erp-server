-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR NOT NULL DEFAULT E'',
    "code" INTEGER NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,
    "description" VARCHAR NOT NULL DEFAULT E'',
    "fixedShiftId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
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
    "city" VARCHAR(20),
    "state" VARCHAR(20),
    "zipCode" VARCHAR(10),
    "hireDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateBirth" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixedShift" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT true,
    "tuesday" BOOLEAN NOT NULL DEFAULT true,
    "wednesday" BOOLEAN NOT NULL DEFAULT true,
    "thursday" BOOLEAN NOT NULL DEFAULT true,
    "friday" BOOLEAN NOT NULL DEFAULT true,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "deleteAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleteBy" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
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
CREATE UNIQUE INDEX "employee.username_unique" ON "employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "employee.email_unique" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.username_unique" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "department" ADD FOREIGN KEY ("fixedShiftId") REFERENCES "fixedShift"("id") ON DELETE CASCADE ON UPDATE CASCADE;
