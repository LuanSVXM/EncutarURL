import { Request, Response } from "express";
import helper from "@helpers";
import { v4 } from "uuid";
import { AppDataSource } from "@server";
import CurtUrls from "../models/curt-urls.model";
import getEnvironments from "@environment";
import User from "../../users/models/user.model";
import { IsNull } from "typeorm";

export default class CurtUrlsController {
  public async show(request: Request, response: Response) {
    try {
      const { path } = request.params;
      if (!helper.ValidUrlLenght(String(path))) {
        return await response
          .status(404)
          .json(helper.SendMessage("Pagina não encontrada"));
      }
      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      const url = await curtUrlRepo.findOne({
        select: {
          id: true,
          views: true,
          url: true,
        },
        where: {
          short_id: String(path).trim(),
          deleted_at: IsNull(),
        },
      });

      if (!url) {
        return await response
          .status(404)
          .json(helper.SendMessage("Pagina não encontrada"));
      }

      helper.CountURl(url);

      return response
        .status(200)
        .redirect(url?.url || "https://www.google.com/");
    } catch (err) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { url } = request.body;

      if (!url || !helper.ValidUrl(String(url))) {
        return await response
          .status(401)
          .json(helper.SendMessage("Url inválida"));
      }

      const id = v4();

      let ShortID = helper.GerateShortUrl();

      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      const userRepo = AppDataSource.getRepository(User);

      while (
        (await curtUrlRepo.count({ where: { short_id: ShortID } })) > 0 &&
        ShortID !== "user" &&
        ShortID !== "auth" &&
        ShortID !== "cut"
      ) {
        ShortID = helper.GerateShortUrl();
      }

      const user = await userRepo.findOne({
        select: { id: true },
        where: {
          id: request?.user?.id || "",
        },
      });

      const curtUrl = new CurtUrls();
      curtUrl.id = id;
      curtUrl.short_id = ShortID;
      curtUrl.url = String(url);
      curtUrl.user = user;
      curtUrl.views = 0;

      await curtUrlRepo.insert(curtUrl);

      return response
        .status(201)
        .send(`${getEnvironments().baseURl}/${ShortID}`);
    } catch (err) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
