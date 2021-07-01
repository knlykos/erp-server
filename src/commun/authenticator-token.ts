const accessTokenSecret = "NKODEX";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticatorToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  try {
    console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, accessTokenSecret, (err, user) => {
        console.log(user);
        console.log(err);
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
};
