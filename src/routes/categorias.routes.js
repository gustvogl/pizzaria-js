import { Router } from 'express';
import { categorias } from '../controllers/categorias.controller.js';

const router = Router();

router.get('/', categorias);

export default router;