import { Router } from "express";

import UsersController from "../controllers/user.controller";

const userController = new UsersController();
const userRouter = Router();

userRouter.post("/", userController.create);

export default userRouter;
