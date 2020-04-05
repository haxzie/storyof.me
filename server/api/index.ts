import { Router } from "express";
import AuthRouter from "./auth";

const router = Router();

router.use(AuthRouter);

export default router;