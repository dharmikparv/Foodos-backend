/**
 * Application constants. Use these instead of magic strings for order status and HTTP.
 */

/** Order status values (must match client ORDER_STATUS_LABELS) */
export const ORDER_STATUS = {
  RECEIVED: 'Order Received',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
};

/** Allowed progression: Received → Preparing → Out for Delivery → Delivered */
export const STATUS_SEQUENCE = [
  ORDER_STATUS.RECEIVED,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.OUT_FOR_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

/** Valid status values for PATCH /orders/:id/status */
export const VALID_STATUSES = Object.values(ORDER_STATUS);

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
