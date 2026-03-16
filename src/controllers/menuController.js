/**
 * Menu controller: maps HTTP to menu service and response helpers.
 */
import * as menuService from '../services/menuService.js';
import { success } from '../utils/response.js';

export async function getMenu(req, res, next) {
  try {
    const items = menuService.listMenuItems();
    success(res, { items });
  } catch (err) {
    next(err);
  }
}
