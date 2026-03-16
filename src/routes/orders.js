/**
 * Orders routes: list, create, get by ID, update status, advance next status.
 * Validation middleware runs before create and updateStatus.
 */
import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import validateOrder from '../middleware/validateOrder.js';
import validateStatus from '../middleware/validateStatus.js';

const router = Router();

router.get('/', orderController.list);
router.post('/', validateOrder, orderController.create);
router.get('/:id', orderController.getById);
router.patch('/:id/status', validateStatus, orderController.updateStatus);
router.get('/:id/next-status', orderController.advanceNextStatus);

export default router;
