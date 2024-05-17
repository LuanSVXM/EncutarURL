import { AppDataSource } from "@server";
import CurtUrls from "../modules/curt_urls/models/curt-urls.model";
import { customAlphabet } from "nanoid";
import getEnvironments from "@environment";

export const CountURl = async (curt_url: CurtUrls) => {
  if (!curt_url?.id) return false;
  try {
    const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

    await curtUrlRepo.update(
      { id: curt_url?.id },
      { views: Number(curt_url?.views || 0) + 1 }
    );
    return true;
  } catch (err: any) {
    return false;
  }
};

export const ValidUrlLenght = (url: string) => {
    if(url.length > 6 || !url) return false;
    return true;
}


export const ValidUrl = (url: string) => {
    if(url.includes(getEnvironments()?.baseURl)) return false;
    const regURL = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/
    return regURL.test(url);
}

export const GerateShortUrl = () => {
    const AlphabetUrl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const size = Math.floor(Math.random()* 6) + 1;
    return customAlphabet(AlphabetUrl,size)()
}