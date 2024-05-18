import { Request, Response } from "express";
import helper from "@helpers";
import { v4 } from "uuid";
import { AppDataSource } from "@server";
import User from "../models/user.model";
import CurtUrls from "../../curt_urls/models/curt-urls.model";
import getEnvironments from "@environment";
import { IsNull } from "typeorm";
import Config from "@config";

export default class UserUrlsController {
  public async show(request: Request, response: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOne({
        select: {
          id: true,
        },
        where: {
          id: request?.user?.id || "",
        },
      });

      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      if (!user) {
        return response
          .status(404)
          .json(helper.SendMessage("Usuário não encontrado"));
      }

      const urls = await curtUrlRepo.find({
          select: {
            id: true,
            url: true,
            short_id: true,
            views: true,
            created_at: true,
            updated_at: true,
          },
        where: {
          deleted_at: IsNull(),
          user: {
            id: String(request?.user?.id),
          },
        },
        order: {
          created_at: 'DESC',
        }
      });


      interface IResultPayload extends CurtUrls {
        shortURL?: string;
      }

      const formated_result: IResultPayload[] = urls.map(
        (e: IResultPayload) => {
          e.shortURL = `${getEnvironments().baseURl}:${Config().PORT}/${e.short_id}`;
          delete e.short_id;
          return e;
        }
      );

      return response.status(200).json(formated_result);
    } catch (err: any) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id, url } = request.body;

      if (!id || typeof id != "string" || !helper.ValidUrl(url)) {
        return await response
          .status(400)
          .json(helper.SendMessage("Campos inválidos"));
      }
      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      const curtUrl = await curtUrlRepo.findOne({
        where: {
          id: String(id),
          deleted_at: IsNull(),
        },
        relations: {
          user: true,
        },
      });

      if (!curtUrl) {
        return await response
          .status(404)
          .json(helper.SendMessage("Não foi possivel encotrar url"));
      }

      if (
        request?.user?.id !== curtUrl?.user?.id ||
        !curtUrl?.user ||
        !request?.user?.id
      ) {
        return await response
          .status(403)
          .json(helper.SendMessage("Sem permissão para alterar essa url."));
      }

      await curtUrlRepo.update({ id: curtUrl.id }, { url: String(url) });

      return await response
        .status(200)
        .json(helper.SendMessage("Url atualizado com sucesso!", false));
    } catch (err: any) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }

  public async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return await response
          .status(404)
          .json(helper.SendMessage("Url não encontrada."));
      }

      const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

      const curtUrl = await curtUrlRepo.findOne({
        where: {
          id: String(id),
          deleted_at: IsNull(),
        },
        relations: {
          user: true,
        },
      });

      if (!curtUrl) {
        return await response
          .status(400)
          .json(helper.SendMessage("Não foi possivel encotrar url"));
      }

      if (
        request?.user?.id !== curtUrl?.user?.id ||
        !curtUrl?.user ||
        !request?.user?.id
      ) {
        return await response
          .status(403)
          .json(helper.SendMessage("Sem permissão para alterar essa url."));
      }

      await curtUrlRepo.update({ id: curtUrl.id }, { deleted_at: new Date() });

      return await response
        .status(200)
        .json(helper.SendMessage("Url deletada com sucesso!"));
    } catch (err: any) {
      return await response
        .status(500)
        .json(helper.SendMessage("Erro interno"));
    }
  }
}
