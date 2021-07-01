import { Prisma } from ".prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { RequestHandler } from "express-jwt";
import { Employee } from "../../entity/employee";
import { JwtToken } from "../../interfaces/global/jwt-token.interface";
import { authenticatorToken } from "../commun/authenticator-token";
import { EmployeesController } from "./employees.controller";
var jwt = require("express-jwt");
var employeesRouter = Router();

employeesRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const employeename = req.body.employeename;
    const password = req.body.password;
    const employeeController = new EmployeesController();
    try {
      const newemployee = await employeeController.login(
        employeename,
        password
      );
      res.send(newemployee);
    } catch (error) {
      console.log(error, "ERROR");
      res.status(501).send(error.message);
    }
  }
);
employeesRouter.post(
  "/create",
  authenticatorToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const employee: Prisma.employeeCreateInput = req.body.employee;
    const departmentId: number = req.body.departmentId;
    const user = req.user as JwtToken;

    const employeeController = new EmployeesController();
    try {
      const createdEmployee = await employeeController.create(
        employee,
        departmentId,
        user
      );
      res.send(createdEmployee);
    } catch (error) {
      console.log(error, "ERROR");
      res.status(501).send(error.message);
    }
  }
);
employeesRouter.get(
  "/find-one",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.query.id);
    const employeeController = new EmployeesController();
    try {
      const newEmployee = await employeeController.findOne(id);
      res.send(newEmployee);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

employeesRouter.get(
  "/find-all",
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeController = new EmployeesController();
    try {
      const foundResult = await employeeController.findAll();
      res.send(foundResult);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

employeesRouter.put(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const employee: Prisma.employeeUpdateInput = req.body;
    const id: number = Number(req.query.id);
    const employeeController = new EmployeesController();
    try {
      const updatedemployee = await employeeController.update(employee, id);
      res.send(updatedemployee);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

module.exports = employeesRouter;
