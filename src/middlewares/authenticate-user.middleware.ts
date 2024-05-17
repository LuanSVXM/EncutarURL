import getEnvironments from "@environment";
import helpers from "@helpers";
import { AppDataSource } from "@server";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import User from "../modules/users/models/user.model";

interface ITokenPayload {
  userId: string;
  username: string;
  iat: number;
  sub: string;
}

export default async function AuthenticateUser(
  request: Request,
  response: Response,
  next: NextFunction,
  requiredUser = false
) {
  try {
    const token = helpers.GetToken(request?.headers?.authorization || "");
    if (!token) {
      if (requiredUser) {
        return response
          .status(400)
          .json(helpers.SendMessage("Usuário não autenticado."));
      }
      return next();
    }
    const secret = getEnvironments().jwtPassword;

    const decoded = verify(token, secret);

    const userRepo = AppDataSource.getRepository(User);

    const { sub } = decoded as ITokenPayload;

    const user = await userRepo.findOne({
      select: {
        id: true,
      },
      where: {
        id: sub,
      },
    });

    if (!user) {
      return response
        .status(400)
        .json(helpers.SendMessage("Usuário não autenticado."));
    }

    request.user = { id: sub };

    return next();
  } catch (err) {
    return response
        .status(500)
        .json(helpers.SendMessage("Erro interno!"));
  }
}
