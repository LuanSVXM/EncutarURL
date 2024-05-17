import { AppDataSource } from "@server";
import CurtUrls from "../modules/curt_urls/models/curt-urls.model";

export const CountURl = async (curt_url: CurtUrls) => {
  if (!curt_url?.id) return false;
  try {
    const curtUrlRepo = AppDataSource.getRepository(CurtUrls);

    await curtUrlRepo.update(
      { id: curt_url?.id },
      { views: (curt_url?.views || 0) + 1 }
    );
    return true;
  } catch (err: any) {
    return false;
  }
};
