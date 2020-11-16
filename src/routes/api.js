import express from 'express';
import { exampleRoutes } from './v1/Example';
import { userRoutes } from './v1/users';

const router = express.Router();

router.use(userRoutes, exampleRoutes);

export { router as api };
