import { Request, Response } from "express";
import helper from "@helpers";
import { v4 } from "uuid";
import { AppDataSource } from "@server";
import User from "../models/user.model";
import CurtUrls from "../../curt_urls/models/curt-urls.model";
import getEnvironments from "@environment";

export default class UserUrlsController {
  public async show(request: Request, response: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({
        where: {
          id: request?.user?.id || "",
        },
      });

      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      if (!user) {
        return response
          .status(401)
          .json(helper.SendMessage("Usuário não encontrado"));
      }

      const urls = await curtUrlRepo.find({
        where: {
          user: user,
        },
      });

      interface IResultPayload extends CurtUrls {
        shortURL?: string;
      }

      const formated_result: IResultPayload[]  = urls.map((e: IResultPayload) => {
        e.shortURL = `${getEnvironments().baseURl}/${e.short_id}`;
        delete e.short_id;
        return e;
      });

      return response.status(201).json(formated_result);
    } catch (err: any) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
