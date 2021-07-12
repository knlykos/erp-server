import { Prisma, PrismaClient } from "@prisma/client";
import { Client } from "@elastic/elasticsearch";
// import type { Client as NewTypes } from "@elastic/elasticsearch/api/new";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

const client = new Client({
  node: "http://localhost:9200",
});

interface Source {
  foo: string;
}

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

  async fillAllElasticSearch() {
    try {
      await client.indices.create(
        {
          index: "products",
          body: {
            mappings: {
              properties: {
                id: { type: "integer" },
                code: { type: "text" },
                name: { type: "text" },
                description: { type: "text" },
                barcode: { type: "text" },
              },
            },
          },
        },
        { ignore: [400] }
      );

      const dataSet = await prisma.product.findMany({
        where: { active: true },
      });
      console.log(dataSet)
      const body = dataSet.flatMap((doc) => [
        { index: { _index: "products" } },
        doc,
      ]);

      const { body: bulkResponse } = await client.bulk({ refresh: true, body });
      if (bulkResponse.errors) {
        const erroredDocuments = [];
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0];
          if (action[operation].error) {
            erroredDocuments.push({
              // If the status is 429 it means that you can retry the document,
              // otherwise it's very likely a mapping error, and you should
              // fix the document before to try it again.
              status: action[operation].status,
              error: action[operation].error,
              operation: body[i * 2],
              document: body[i * 2 + 1],
            });
          }
        });
        console.log(erroredDocuments);
      }

      const { body: count } = await client.count({ index: "products" });
      console.log(count);
    } catch (error) {
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
