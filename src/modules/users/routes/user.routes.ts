import { Router } from "express";

import UsersController from "../controllers/user.controller";
import UserUrlsController from "../controllers/user-urls.controller";
import middlewares from "@middlewares";

const userController = new UsersController();
const userUrlsController = new UserUrlsController();
const userRouter = Router();


userRouter.post("/", userController.create);

export default userRouter;
