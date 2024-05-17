import { Router } from "express";

import NameRoutes from "../names";
import curtUrlRouter from "../../modules/curt_urls/routes/curt_urls.routes";

const router = Router();

router.use(NameRoutes.CurtUrlsRoute, curtUrlRouter);



export default router;
