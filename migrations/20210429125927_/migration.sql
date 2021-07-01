-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "departmentId" INTEGER;

-- AddForeignKey
ALTER TABLE "employee" ADD FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
