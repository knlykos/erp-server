import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { RequestHandler } from "express-jwt";
import { Department } from "../../entity/department";
import { Employee } from "../../entity/employee";
import { JwtToken } from "../../interfaces/global/jwt-token.interface";
import { DepartmentsController } from "./departments.controller";

var jwt = require("express-jwt");
var departmentRouter = Router();

departmentRouter.get(
  "/find-all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentCtrlr = new DepartmentsController();
      const result = await departmentCtrlr.findALl();
      res.send(result);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

departmentRouter.get(
  "/find-one",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.query.id);
      const departmentCtrlr = new DepartmentsController();
      const result = await departmentCtrlr.findOne(id);
      res.send(result);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

departmentRouter.post(
  "/create",
  jwt({ secret: "NKODEX", algorithms: ["HS256"] }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department: Prisma.departmentCreateInput = req.body;
      const user = req.user as JwtToken;
      const userId = user.id;
      const departmentCtrlr = new DepartmentsController();
      const result = await departmentCtrlr.create(department, userId);
      res.send(result);
    } catch (error) {
      console.log("ERROR",error);
      res.status(501).send(error.message);
    }
  }
);

departmentRouter.put(
  "/update",
  jwt({ secret: "NKODEX", algorithms: ["HS256"] }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department: Prisma.departmentUpdateInput = req.body;
      const id = Number(req.query.id);
      const user = req.user as JwtToken;
      const userId = user.id;
      const departmentCtrlr = new DepartmentsController();
      const result = departmentCtrlr.update(department, id, userId);
      res.send(result);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);
departmentRouter.delete(
  "/delete",
  jwt({ secret: "NKODEX", algorithms: ["HS256"] }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.query.id);
      const user = req.user as JwtToken;
      const userId = user.id;
      const departmentCtrlr = new DepartmentsController();
      const result = departmentCtrlr.delete(id, userId);
      res.send(result);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

departmentRouter.post(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentCtrlr = new DepartmentsController();
      const result = await departmentCtrlr.test();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(501).send(error.message);
    }
  }
);

module.exports = departmentRouter;
