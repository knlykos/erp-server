import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { RequestHandler } from "express-jwt";
import { Employee } from "../../entity/employee";
import { FixedShift } from "../../entity/fixed-shift";
import { JwtToken } from "../../interfaces/global/jwt-token.interface";
import { authenticatorToken } from "../commun/authenticator-token";
import { ShiftConfigController } from "./shift-config.controller";

var jwt = require("express-jwt");
var shiftConfigRouter = Router();

shiftConfigRouter.get(
  "/find-all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftConfigCtrlr = new ShiftConfigController();
      const result = await shiftConfigCtrlr.findAll();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(501).send(error);
    }
  }
);

shiftConfigRouter.get(
  "/find-one",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.query.id);
      const shiftConfigCtrlr = new ShiftConfigController();
      const result = await shiftConfigCtrlr.findOne(id);
      res.send(result);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

shiftConfigRouter.get(
  "/find-by-department",
  async (req: Request, res: Response, next: NextFunction) => {}
);

shiftConfigRouter.post(
  "/create",
  authenticatorToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fixedShift: Prisma.fixedShiftCreateInput = req.body.data;
      const departmentId = req.body.departmentId;
      const user = req.user as JwtToken;
      const userId = user.id;
      const shiftConfigCtrlr = new ShiftConfigController();
      const result = await shiftConfigCtrlr.create(fixedShift, userId, departmentId);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(501).send(error.message);
    }
  }
);

shiftConfigRouter.put(
  "/update",
  authenticatorToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fixedShift: Prisma.fixedShiftCreateInput = req.body;
      const fixedShiftId: number = Number(req.query.id);
      const user = req.user as JwtToken;
      console.log(user);
      const userId = user.id;
      const shiftConfigCtrlr = new ShiftConfigController();
      const result = await shiftConfigCtrlr.update(
        fixedShift,
        fixedShiftId,
        userId
      );
      res.send(result);
    } catch (error) {
      res.status(501).send(error);
    }
  }
);

shiftConfigRouter.delete(
  "/delete-by-id",
  async (req: Request, res: Response, next: NextFunction) => {}
);

module.exports = shiftConfigRouter;
