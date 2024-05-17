import { Request, Response } from "express";
import helper from "@helpers";

export default class CurtUrlsController {
  public async acessURL(request: Request, response: Response) {
    try {
      const { path } = request.params;
      if (!helper.validationUrl(String(path))) {
        return await response
          .status(404)
          .json(helper.SendMessage("Pagina não encontrada"));
      }
      return response.status(200).redirect("");
    } catch (err) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
