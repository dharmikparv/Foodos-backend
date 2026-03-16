/**
 * Centralized response helpers for consistent API shape.
 */
import { HTTP_STATUS } from '../constants/index.js';

export function success(res, data = {}) {
  res.status(HTTP_STATUS.OK).json(data);
}

export function created(res, data) {
  res.status(HTTP_STATUS.CREATED).json(data);
}

export function badRequest(res, message, details = []) {
  const body = { error: message };
  if (details.length > 0) body.details = details;
  res.status(HTTP_STATUS.BAD_REQUEST).json(body);
}
