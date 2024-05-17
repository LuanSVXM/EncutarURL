import { Router } from "express";

import CurtUrlsController from "../controllers/curt-urls.controller";
import middlewares from "@middlewares";

const curtUrlController = new CurtUrlsController();
const curtUrlRouter = Router();

curtUrlRouter.get("/:path", middlewares.AuthenticateUser, curtUrlController.show);

curtUrlRouter.post("/cut", middlewares.AuthenticateUser, curtUrlController.create);

export default curtUrlRouter;
