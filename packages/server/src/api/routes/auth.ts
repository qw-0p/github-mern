import { Router, Request, Response } from "express";
import * as userController from "../controllers/auth";

const userRouter = Router();

userRouter.post(
  '/signup',
  async (req: Request, res: Response) => {
    const user = await userController.create(req.body);
    res.status(201).send(user);
  },
);

userRouter.post(
  '/login',
  async (req: Request, res: Response) => {
    const user = await userController.login(req.body);
    res.status(201).send(user);
  },
);

userRouter.post(
  '/refresh',
  async (req: Request, res: Response) => {
    const user = await userController.refreshToken(req.body);
    res.status(201).send(user);
  },
);


export default userRouter;
