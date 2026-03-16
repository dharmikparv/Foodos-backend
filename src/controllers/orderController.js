/**
 * Order controller: maps HTTP to order service and response helpers.
 */
import * as orderService from '../services/orderService.js';
import { success, created } from '../utils/response.js';

export async function list(req, res, next) {
  try {
    const orders = orderService.listOrders();
    success(res, { orders });
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const order = orderService.findOrderById(req.params.id);
    success(res, order);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const order = orderService.placeOrder(req.body);
    created(res, order);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const order = orderService.setOrderStatus(req.params.id, req.body.status);
    success(res, order);
  } catch (err) {
    next(err);
  }
}

export async function advanceNextStatus(req, res, next) {
  try {
    const result = orderService.advanceOrderStatus(req.params.id);
    success(res, result);
  } catch (err) {
    next(err);
  }
}
