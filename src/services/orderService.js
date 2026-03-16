/**
 * Order service: business logic for orders (enrich items, status progression).
 */
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getNextStatus,
  getMenuItems,
} from '../data/store.js';
import AppError from '../errors/AppError.js';
import { HTTP_STATUS } from '../constants/index.js';

const menuItems = getMenuItems();

function getMenuItemById(id) {
  return menuItems.find((m) => m.id === String(id));
}

function enrichOrderItems(items) {
  return items.map(({ menuItemId, quantity }) => {
    const menuItem = getMenuItemById(menuItemId);
    return {
      menuItemId,
      name: menuItem?.name ?? 'Unknown',
      price: menuItem?.price ?? 0,
      quantity: Number(quantity),
    };
  });
}

export function listOrders() {
  return getAllOrders();
}

export function findOrderById(id) {
  const order = getOrderById(id);
  if (!order) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Order not found');
  }
  return order;
}

export function placeOrder(body) {
  const { deliveryDetails, items } = body;
  const enrichedItems = enrichOrderItems(items);
  return createOrder(deliveryDetails, enrichedItems);
}

export function setOrderStatus(id, status) {
  const order = getOrderById(id);
  if (!order) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Order not found');
  }
  const trimmed = status.trim();
  const updated = updateOrderStatus(id, trimmed);
  if (!updated) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, 'Invalid status value');
  }
  return updated;
}

export function advanceOrderStatus(id) {
  const order = getOrderById(id);
  if (!order) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Order not found');
  }
  const next = getNextStatus(order.status);
  if (!next) {
    return { order, nextStatus: null, message: 'Order already delivered' };
  }
  const updated = updateOrderStatus(id, next);
  return { order: updated, nextStatus: next };
}
