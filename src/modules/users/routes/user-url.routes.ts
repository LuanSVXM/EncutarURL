import { NextFunction, Router, Request, Response } from "express";

import UsersController from "../controllers/user.controller";
import UserUrlsController from "../controllers/user-urls.controller";
import middlewares from "@middlewares";

const userUrlsController = new UserUrlsController();
const userUrlRouter = Router();

const auteticateRequired = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return middlewares.AuthenticateUser(request, response, next, true);
};

userUrlRouter.get("/", auteticateRequired, userUrlsController.show);

userUrlRouter.put("/", auteticateRequired, userUrlsController.update);

userUrlRouter.delete("/:id", auteticateRequired, userUrlsController.remove);

export default userUrlRouter;
