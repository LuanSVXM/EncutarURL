import { Router } from "express";

import CurtUrlsController from "../controllers/curt-urls.controller";

const curtUrlController = new CurtUrlsController();
const curtUrlRouter = Router();

curtUrlRouter.get("/:path", curtUrlController.acessURL);

export default curtUrlRouter;
