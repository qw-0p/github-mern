import { Request, Response, Router } from 'express';
import * as contentController from '../controllers/content';

const contentRouter = Router();

contentRouter.post(
  '/',
  async (req: Request, res: Response) => {
    const user = await contentController.create(req.body);
    res.status(201).send(user);
  },
);

contentRouter.get(
  '/',
  async (req: Request, res: Response) => {
    const user = await contentController.getAll();
    res.status(201).send(user);
  },
);

contentRouter.delete(
  '/:id',
  async (req: Request, res: Response) => {
    const user = await contentController.deleteById(req.params.id as string);
    res.status(201).send(user);
  },
);




export default contentRouter;
