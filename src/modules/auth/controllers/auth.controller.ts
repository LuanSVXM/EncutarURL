import { Request, Response } from "express";
import helper from "@helpers";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "@server";
import getEnvironments from "@environment";
import User from "../../users/models/user.model";

export default class AuthController {
  public async authenticate(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      if (
        !password ||
        typeof password !== "string" ||
        !helper.ValidEmail(String(email))
      ) {
        return response
          .status(400)
          .json(helper.SendMessage("Campos inválidos!"));
      }

      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({
        where: { email },
      });

      if (!user || !user?.password || !user?.id) {
        return response
          .status(404)
          .json(helper.SendMessage("Usuário não encontrado"));
      }

      const isValidPassword = await helper.CompareHash(password, user.password);

      if (!isValidPassword) {
        return response.status(401).json(helper.SendMessage("Senha incorreta"));
      }

      const secret = getEnvironments().jwtPassword;

      const token = jwt.sign(
        { userId: String(user.id), username: String(user.email) },
        secret,
        {
          subject: String(user.id),
        }
      );

      return response.status(200).json({
        email: user.email,
        name: user.name,
        token: token,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json(helper.SendMessage("Erro interno"));
    }
  }
}
