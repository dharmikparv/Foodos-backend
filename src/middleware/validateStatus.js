/**
 * Validates request body for PATCH /api/orders/:id/status.
 */
import { isValidStatus } from '../utils/validation.js';
import { badRequest } from '../utils/response.js';

export default function validateStatus(req, res, next) {
  const { status } = req.body;
  if (status === undefined || status === null || !isValidStatus(status)) {
    return badRequest(res, 'Status is required and must be a valid order status');
  }
  next();
}
