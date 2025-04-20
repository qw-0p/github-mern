import { Router } from "express";
import authRouter from "./auth";
import contentRouter from "./content";

const router = Router()

router.use('/auth', authRouter);
router.use('/', contentRouter);

export default router;
