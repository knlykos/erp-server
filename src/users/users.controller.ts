import { getRepository } from "typeorm";
import { User } from "../../entity/user";
import { hash, compare } from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});


interface Token extends SignOptions {
  id: number;
  role: number;
  firstname: string;
  lastname: string;
}
export class UsersController {
  async findOne(id: number) {
    try {
      // const result = await getRepository(User).findOne({ where: { id: id } });
      const result = await prisma.user.findUnique({
        where: { id: id },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      // const foundResult = await getRepository(User).find();
      const foundResult = await prisma.user.findMany();
      return foundResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(user: Prisma.UserCreateInput) {
    console.log(user);
    try {
      // const createdUser = await getRepository(User).save(user);
      const createdUser = await prisma.user.create({ data: user });
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(user: User) {
    try {
      const updatedUser = await getRepository(User).update(
        { id: user.id },
        user
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signup(email: string, username: string, password: string) {
    console.log(email);
    try {
      const userData: Prisma.UserCreateInput = {
        username: username,
        password: password,
        email: email,
      };
      const passwordHashed = await new Promise<string>((resolve, reject) => {
        hash(password, 10, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
      const user: Prisma.UserCreateInput = {
        email: email,
        username: username,
        password: passwordHashed,
      };

      // const result = await getRepository(User).save(user);
      const result = await prisma.user.create({ data: user });
      return result;
    } catch (error) {
      // console.log(error);
      throw new Error(error);
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      console.log(user);
      // const user = await getRepository(User).findOne({
      //   where: { username: username },
      // });
if (user === null) {
  throw new Error("username doesn't found");
  
}
      const passwordHashed = await new Promise<boolean>((resolve, reject) => {
        compare(password, user.password, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
      if (passwordHashed === true) {
        const singData: Token = {
          issuer: "NKODEX",
          subject: user.username,
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.userRole,
        };

        const token = sign(singData, "NKODEX");
        return { token: token };
      }
      throw new Error("Password not match");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
