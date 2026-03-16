/**
 * Menu service: read-only operations on menu items.
 */
import { getMenuItems } from '../data/store.js';

export function listMenuItems() {
  return getMenuItems();
}
