/**
 * Menu routes: GET /api/menu → controller only (no validation needed).
 */
import { Router } from 'express';
import * as menuController from '../controllers/menuController.js';

const router = Router();

router.get('/', menuController.getMenu);

export default router;
