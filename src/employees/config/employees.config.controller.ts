import { NextFunction, Request, Response, Router } from "express";
import { RequestHandler } from "express-jwt";
// import { Employee } from "../../entity/employee";
// import { JwtToken } from "../../interfaces/global/jwt-token.interface";
// import { EmployeesController } from "./employees.controller";
var jwt = require("express-jwt");
var employeesConfRouter = Router();

// employeesRouter.post(
//   "/signup",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const employeename = req.body.employeename;
//     const password = req.body.password;
//     const employeeController = new employeesController();
//     try {
//       const newemployee = await employeeController.signup(employeename, password);
//       res.send(newemployee);
//     } catch (error) {
//       res.status(501).send(error.message);
//     }
//   }
// );

employeesConfRouter.post(
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
employeesConfRouter.post(
  "/create",
  jwt({ secret: "NKODEX", algorithms: ["HS256"] }),
  async (req: Request, res: Response, next: NextFunction) => {
    const employee: Employee = req.body;
    const user = req.user as JwtToken;

    const employeeController = new EmployeesController();
    try {
      const createdEmployee = await employeeController.create(employee, user);
      res.send(createdEmployee);
    } catch (error) {
      console.log(error, "ERROR");
      res.status(501).send(error.message);
    }
  }
);
employeesConfRouter.get(
  "/find-one",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    console.log(id)
    const employeeController = new EmployeesController();
    try {
      const newEmployee = await employeeController.findOne(id);
      res.send(newEmployee);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

employeesConfRouter.get(
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

employeesConfRouter.put(
  "/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const employee: Employee = req.body;
    const employeeController = new EmployeesController();
    try {
      const updatedemployee = await employeeController.update(employee);
      res.send(updatedemployee);
    } catch (error) {
      res.status(501).send(error.message);
    }
  }
);

module.exports = employeesConfRouter;
