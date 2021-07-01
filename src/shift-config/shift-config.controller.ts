import { getRepository } from "typeorm";
import { FixedShift } from "../../entity/fixed-shift";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});
export class ShiftConfigController {
  constructor() {}

  async findAll() {
    try {
      const foundResults = await prisma.fixedShift.findMany();
      return foundResults;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await prisma.fixedShift.findUnique({ where: { id: id } });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByDepartment(id: string) {
    try {
      const result = await getRepository(FixedShift).findOne({
        where: { id: id },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(
    fixedShift: Prisma.fixedShiftCreateInput,
    userId: number,
    departmentId: number
  ) {
    try {
      // fixedShift.departments.connect = { id: departmentId };
      fixedShift.createdBy = userId;
      const createdResult = await prisma.fixedShift.create({
        data: {...fixedShift, departments: {
          connect: {id: departmentId}
        }},
      });
      return createdResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    fixedShift: Prisma.fixedShiftUpdateInput,
    fixedShiftId: number,
    userId: number
  ) {
    try {
      fixedShift.updatedBy = userId;
      console.log(fixedShift);
      // const updatedResult = await getRepository(FixedShift).update(
      //   { id: fixedShift.id },
      //   fixedShift
      // );
      const updatedResult = await prisma.fixedShift.update({
        where: { id: fixedShiftId },
        data: fixedShift,
      });
      return updatedResult;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      const deleteResult = await getRepository(FixedShift).delete({ id: id });
      return deleteResult;
    } catch (error) {
      throw new Error(error);
    }
  }
}
