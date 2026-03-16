/**
 * Centralized error handler. AppError → statusCode + message; other errors → 500.
 */
import { HTTP_STATUS } from '../constants/index.js';
import AppError from '../errors/AppError.js';

export default function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error(err);
  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ error: 'Internal server error' });
}
