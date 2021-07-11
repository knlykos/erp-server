import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

export class SalesOrderController {
  async findOne(id: number) {
    try {
      const result = await prisma.saleOrder.findUnique({
        where: { id: id },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const foundResult = await prisma.product.findMany();
      return foundResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(saleOrder: Prisma.SaleOrderCreateInput) {
    try {
      const createdSaleOrder = await prisma.saleOrder.create({
        data: saleOrder,
      });
      return createdSaleOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, saleOrder: Prisma.SaleOrderCreateInput) {
    try {
      const updatedSaleOrder = await prisma.saleOrder.update({
        where: { id: id },
        data: saleOrder,
      });
      return updatedSaleOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
}
