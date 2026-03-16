/**
 * Application error with HTTP status. Throw from services; error handler sends status and message.
 */
export default class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
