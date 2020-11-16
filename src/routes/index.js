import express from 'express';
import { api } from './api';
import { body } from 'express-validator';

const router = express.Router();

// sanitize ALL
router.use('*', [body('*').trim().escape()], (req, res, next) => {
  next();
});

// view code here
router.use('/v1', api);

export { router };
