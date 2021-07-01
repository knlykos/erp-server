import { NextFunction, Request, Response, Router } from "express";
import { RequestHandler } from "express-jwt";
import { Employee } from "../../entity/employee";
import { JwtToken } from "../../interfaces/global/jwt-token.interface";
import { ShiftPlannerController } from "./shift-planner.controller";
var jwt = require("express-jwt");
var employeesRouter = Router();

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

employeesRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const employeename = req.body.employeename;
    const password = req.body.password;
    const employeeController = new ShiftPlannerController();
    // try {
    //   const newemployee = await employeeController.login(
    //     employeename,
    //     password
    //   );
    //   res.send(newemployee);
    // } catch (error) {
    //   console.log(error, "ERROR");
    //   res.status(501).send(error.message);
    // }
  }
);

module.exports = employeesRouter;
