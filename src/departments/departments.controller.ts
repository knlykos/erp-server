import { getRepository } from "typeorm";
import { Department } from "../../entity/department";
import { Profile } from "../../entity/profile";
import { Users } from "../../entity/users";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

export class DepartmentsController {
  constructor() {}

  async findALl() {
    try {
      const foundResults = await prisma.department.findMany();
      return foundResults;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const foundResult = await prisma.department.findUnique({
        where: { id: id },
      });

      return foundResult;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async create(department: Prisma.departmentCreateInput, userId: number) {
    try {
      department.createdBy = userId;
      // const createdResult = await getRepository(Department).save({});
      const createdResult = await prisma.department.create({
        data: department,
      });
      console.log(createdResult);
      return createdResult;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(
    department: Prisma.departmentUpdateInput,
    departmentId: number,
    userId: number
  ) {
    try {
      department.updatedBy = userId;
      const updatedResult = await prisma.department.update({
        where: { id: departmentId },
        data: department,
      });
      return updatedResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: number, userId: number) {
    try {
      // const deleteResult = await getRepository(Department).delete({
      //   id: id,
      //   deleteBy: userId,
      // });
      const deleteResult = await prisma.department.delete({
        where: { id: id },
      });
      return deleteResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async test() {
    // let profile = new Profile();
    // profile.gender = "male";
    // profile.photo = "me.jpg";

    // try {
    //   profile = await getRepository(Profile).save(profile);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(profile, "profile");

    // const user = new Users();
    // user.name = "Joe Smith";
    // user.profile = profile;
    // await getRepository(Users).save(user);

    const userRepository = getRepository(Users);
    const users = await userRepository.find({ relations: ["profile"] });
    console.log(JSON.stringify(users));
    return users;
  }
}
