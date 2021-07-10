import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { ProductsController } from "./products.controller";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
// `${uuidv4}.jpg`
const storage = multer.diskStorage({
  destination: `${__dirname}\\..\\..\\uploads`,
  filename: function (req, file, cb) {
    //req.body is empty...
    cb(null, `${uuidv4()}.jpg`);
  },
});
const upload = multer({ storage: storage });
let productRouter = Router();

productRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const product = req.body;
    const productController = new ProductsController();
    try {
      const productCreated = await productController.create(product);
      res.send(productCreated);
    } catch (error) {
      res.send(501).send(error.message);
    }
  }
);

productRouter.get(
  "/find-one",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.query.id);
    const productController = new ProductsController();
    try {
      const productFound = await productController.findOne(id);
      res.send(productFound);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

productRouter.get(
  "/find-all",
  async (req: Request, res: Response, next: NextFunction) => {
    const productController = new ProductsController();
    try {
      const productsFound = await productController.findAll();
      console.log(productsFound);
      res.send(productsFound);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

productRouter.put(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    const product: Prisma.ProductCreateInput = req.body;
    const id: number = req.body.id;

    const productController = new ProductsController();
    try {
      const productUpdated = await productController.update(id, product);
      res.send(productUpdated);
    } catch (error) {
      console.log(error);
      res.status(501).send(error.message);
    }
  }
);

productRouter.post(
  "/image",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.query.id);

    const productController = new ProductsController();
    try {
      const imageUpdated = await productController.saveImageName(
        id,
        req.file.filename
      );
      res.send(imageUpdated);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

module.exports = productRouter;
