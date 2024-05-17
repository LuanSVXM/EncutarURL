import { Router } from "express";

import NameRoutes from "../names";
import curtUrlRouter from "../../modules/curt_urls/routes/curt_urls.routes";
import userRouter from "../../modules/users/routes/user.routes";
import authRouter from "../../modules/auth/routes/auth.routes";

const router = Router();

router.use(NameRoutes.CurtUrlsRoute, curtUrlRouter);
router.use(NameRoutes.UserRoute, userRouter);
router.use(NameRoutes.AuthRoute, authRouter);

export default router;
