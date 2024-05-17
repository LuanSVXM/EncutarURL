import { Request, Response } from "express";
import helper from "@helpers";
import { AppDataSource } from "@server";
import CurtUrls from "../models/curt-urls.model";

export default class CurtUrlsController {
  public async acessURL(request: Request, response: Response) {
    try {
      const { path } = request.params;
      if (!helper.validationUrl(String(path))) {
        return await response
          .status(404)
          .json(helper.SendMessage("Pagina não encontrada"));
      }
      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      const url = await curtUrlRepo.findOne({
        where: {
          short_id: String(path),
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
        console.log(err);
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
