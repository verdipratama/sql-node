import express from 'express';

const router = express.Router();

router.get('/');
router.post('/');
router.get('/:id');
router.post('/login');
router.patch('/');
router.delete('/');

export { router as userRoutes };
