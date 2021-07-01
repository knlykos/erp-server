import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { User } from "../../entity/user";
import { UsersController } from "./users.controller";

var userRouter = Router();

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    console.log(email);
    const username = req.body.username;
    const password = req.body.password;
    const userController = new UsersController();
    try {
      const newUser = await userController.signup(email, username, password);
      res.send(newUser);
    } catch (error) {
      console.log(error);
      res.status(501).send(error.message);
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    const userController = new UsersController();
    try {
      const newUser = await userController.login(username, password);
      res.send(newUser);
    } catch (error) {
      console.log(error, "ERROR");
      res.status(501).send(error.message);
    }
  }
);
userRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const user: Prisma.UserCreateInput = req.body;

    const userController = new UsersController();
    try {
      const createdUser = await userController.create(user);
      res.send(createdUser);
    } catch (error) {
      console.log(error, "ERROR");
      res.status(501).send(error.message);
    }
  }
);
userRouter.get(
  "/find-by-id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const userController = new UsersController();
    try {
      const newUser = await userController.findOne(id);
      res.send(newUser);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

userRouter.get(
  "/findAll",
  async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UsersController();
    try {
      const foundResult = await userController.findAll();
      res.send(foundResult);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

userRouter.put(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    const userController = new UsersController();
    try {
      const updatedUser = await userController.update(user);
      res.send(updatedUser);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

module.exports = userRouter;
