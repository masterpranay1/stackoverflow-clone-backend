import express from 'express';
const router = express.Router();

import { createQuestion } from '../controller/questionController';
import { protect } from '../middleware/authMiddleware';

router.post('/create', protect, createQuestion);

export default router;
