/**
 * Validates request body for POST /api/orders. Sends 400 with details if invalid.
 */
import { validateOrderRequest } from '../utils/validation.js';
import { badRequest } from '../utils/response.js';

export default function validateOrder(req, res, next) {
  const { valid, errors } = validateOrderRequest(req.body);
  if (!valid) {
    return badRequest(res, 'Validation failed', errors);
  }
  next();
}
