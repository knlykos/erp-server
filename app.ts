import { PrismaClient } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

let indexRouter = require("./routes/index");
let usersRouter = require("./src/users/users.routes");
let employeesRouter = require("./src/employees/employees.routes");
let departmentRouter = require("./src/departments/departments.routes");
let shiftConfigRouter = require("./src/shift-config/shift-config.router");
var app = express();
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

// prisma.$on("query", async (e) => {
//     console.log(`${e.query} ${e.params}`)
// });
// createConnection({
//   type: "postgres",
//   host: "172.17.0.3",
//   port: 5432,
//   username: "postgres",
//   password: "123456",
//   database: "timeattendance",
//   entities: [__dirname + "/entity/*.ts"],
//   synchronize: true,
// })
//   .then((connection) => {
    // console.log(connection.logger);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.use(cors());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // app.use("/", indexRouter);
    app.use("/users", usersRouter);
    app.use("/employees", employeesRouter);
    app.use("/shift-config", shiftConfigRouter);
    app.use("/departments", departmentRouter);

    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });

    // error handler
    app.use(function (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  // })
  // .catch((error: any) => console.log(error));
// view engine setup

module.exports = app;
