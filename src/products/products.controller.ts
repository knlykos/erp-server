import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

export class ProductsController {
  async findOne(id: number) {
    try {
      const result = await prisma.product.findUnique({
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
      console.log(error, "error");
      throw new Error(error);
    }
  }
  async create(product: Prisma.ProductCreateInput) {
    console.log(product);
    try {
      // const createdUser = await getRepository(User).save(user);
      const createdProduct = await prisma.product.create({ data: product });
      return createdProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, product: Prisma.ProductUpdateInput) {
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: product,
      });
      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveImageName(id: number, image: string) {
    try {
      const updatedImage = await prisma.$queryRaw(
        'update "Product" set image = $1 where id = $2;',
        image,
        id
      );
      return updatedImage;
    } catch (error) {
      throw new Error(error);
    }
  }
}
