import {
  getRepository,
  UsingJoinColumnOnlyOnOneSideAllowedError,
} from "typeorm";
import { Employee } from "../../entity/employee";
import { hash, compare } from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import { JwtToken } from "../../interfaces/global/jwt-token.interface";
import { Prisma, PrismaClient } from ".prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

interface Token extends SignOptions {
  id: string;
  role: number;
  firstName: string;
  lastName: string;
}
export class EmployeesController {
  async findOne(id: number) {
    try {
      // const result = await getRepository(Employee).findOne({
      //   where: { id: id },
      // });

      const result = await prisma.employee.findUnique({ where: { id: id } });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      // const foundResult = await getRepository(Employee).find();
      const foundResult = await prisma.employee.findMany();
      return foundResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  randomString(len: number, an: string) {
    an = an && an.toLowerCase();
    var str = "",
      i = 0,
      min = an == "a" ? 10 : 0,
      max = an == "n" ? 10 : 62;
    for (; i++ < len; ) {
      var r = (Math.random() * (max - min) + min) << 0;
      str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }
    return str;
  }

  generateUsername(firstName: string, lastName: string, dateBirth: Date) {
    let firstLetter = "";
    let secondLetter = "";
    let thirdLetter = "";
    let fourthLetter = "";
    if (firstName) {
      const firstNameArray = firstName.split(" ");
      firstLetter = firstNameArray[0][0];
      if (firstNameArray.length > 1) {
        secondLetter = firstNameArray[1][0];
      } else {
        secondLetter = "X";
      }
    }

    if (lastName) {
      const lastNameArray = lastName.split(" ");
      thirdLetter = lastNameArray[0][0];
      if (lastNameArray.length > 1) {
        fourthLetter = lastNameArray[1][0];
      } else {
        fourthLetter = "X";
      }
    }
    const randomLetters = this.randomString(3, firstLetter);
    dateBirth = new Date(dateBirth);
    console.log(dateBirth.getDate());
    const username =
      firstLetter +
      secondLetter +
      dateBirth.getDate() +
      thirdLetter +
      randomLetters;
    return username;
  }

  async create(
    employee: Prisma.employeeCreateInput,
    departmentId: number,
    user: JwtToken
  ) {
    employee.username = this.generateUsername(
      employee.firstname,
      employee.lastname,
      employee.dateBirth as Date
    );
    employee.createdBy = user.id;

    try {
      // const createdemployee = await getRepository(Employee).save(employee);
      const employeeCreated = await prisma.employee.create({
        data: { ...employee, department: { connect: { id: departmentId } } },
      });
      return employeeCreated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(employee: Prisma.employeeUpdateInput, employeeId: number) {
    try {
      const updatedEmployee = await prisma.employee.update({
        data: employee,
        where: { id: employeeId },
      });
      return updatedEmployee;
    } catch (error) {
      throw new Error(error);
    }
  }

  async signup(username: string, password: string) {
    try {
      const passwordHashed = await new Promise<string>((resolve, reject) => {
        hash(password, 10, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
      const employee = new Employee();
      employee.username = username;
      employee.password = passwordHashed;

      employee.createdBy = "";
      employee.updatedBy = "";
      employee.deleteBy = "";
      const result = await getRepository(Employee).save(employee);
      return result;
    } catch (error) {
      // console.log(error);
      throw new Error(error);
    }
  }

  async login(username: string, password: string) {
    try {
      const employee = await getRepository(Employee).findOne({
        where: { username: username },
      });

      const passwordHashed = await new Promise<boolean>((resolve, reject) => {
        compare(password, employee.password, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
      if (passwordHashed === true) {
        const singData: Token = {
          issuer: "NKODEX",
          subject: employee.username,
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          role: employee.employeeRole,
        };

        const token = sign(singData, "NKODEX");
        return { token: token };
      }
      throw new Error("Password not match");
    } catch (error) {
      // console.log(error);
      throw new Error(error);
    }
  }
}
