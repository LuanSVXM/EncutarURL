import { Request, Response } from "express";
import helper from "@helpers";
import { v4 } from "uuid";
import { AppDataSource } from "@server";
import User from "../models/user.model";

export default class UsersController {
  public async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      if (
        !name ||
        typeof name !== "string" ||
        !password ||
        typeof password !== "string" ||
        !helper.ValidEmail(String(email))
      ) {
        return response
          .status(404)
          .json(helper.SendMessage("Campos inválidos!"));
      }

      const userRepo = AppDataSource.getRepository(User);

      const validUser = await userRepo.count({
        where: { email: String(email) },
      });

      if (validUser > 0) {
        return response
          .status(401)
          .json(helper.SendMessage("Email já está em uso."));
      }

      const user = new User();
      user.id = v4();
      user.name = String(name);
      user.email = String(email);
      user.password = await helper.GenerateHash(String(password), 10);

      await AppDataSource.getRepository(User).insert(user);

      return response
        .status(201)
        .json({ id: user.id, name: user.name, email: user.email });
    } catch (err: any) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
