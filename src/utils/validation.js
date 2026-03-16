/**
 * Input validation for order and status endpoints.
 */
import { getMenuItems } from '../data/store.js';
import { VALID_STATUSES } from '../constants/index.js';

const PHONE_REGEX = /^\+?[\d\s\-()]{10,20}$/;

export function validateOrderRequest(body) {
  const errors = [];

  if (!body.deliveryDetails || typeof body.deliveryDetails !== 'object') {
    return { valid: false, errors: ['deliveryDetails is required'] };
  }

  const { name, address, phoneNumber } = body.deliveryDetails;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!address || typeof address !== 'string' || address.trim().length < 5) {
    errors.push('Address must be at least 5 characters');
  }

  if (!phoneNumber || typeof phoneNumber !== 'string') {
    errors.push('Phone number is required');
  } else if (!PHONE_REGEX.test(phoneNumber.replace(/\s/g, ''))) {
    errors.push('Invalid phone number format');
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    errors.push('At least one item is required');
  } else {
    const menuIds = getMenuItems().map((m) => m.id);
    for (const item of body.items) {
      if (!item.menuItemId || !menuIds.includes(String(item.menuItemId))) {
        errors.push(`Invalid menu item: ${item.menuItemId ?? 'missing'}`);
        break;
      }
      const qty = Number(item.quantity);
      if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
        errors.push('Quantity must be between 1 and 99');
        break;
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isValidStatus(status) {
  return typeof status === 'string' && VALID_STATUSES.includes(status.trim());
}
