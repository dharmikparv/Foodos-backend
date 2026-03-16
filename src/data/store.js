/**
 * In-memory data store for menu items and orders.
 * Production would use a database (e.g., PostgreSQL, MongoDB).
 */
import { ORDER_STATUS, STATUS_SEQUENCE } from '../constants/index.js';

// Seed menu (category and type used for filtering on client)
let menuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    category: 'pizza',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 9.99,
    category: 'burger',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Chicken Tacos',
    description: 'Three soft tacos with grilled chicken and salsa',
    price: 8.49,
    category: 'tacos',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Caesar Salad',
    description: 'Crisp romaine, parmesan, croutons, and Caesar dressing',
    price: 7.99,
    category: 'salad',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Fish & Chips',
    description: 'Beer-battered cod with crispy fries',
    price: 14.99,
    category: 'seafood',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Vegetable Pasta',
    description: 'Penne with seasonal vegetables and olive oil',
    price: 11.49,
    category: 'pasta',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop',
  },
];

let orders = [];
let orderIdCounter = 1;

export const getMenuItems = () => [...menuItems];

export const getAllOrders = () => [...orders].reverse();

export const getOrderById = (id) => orders.find((o) => o.id === String(id));

export const createOrder = (deliveryDetails, items) => {
  const id = String(orderIdCounter++);
  const order = {
    id,
    deliveryDetails,
    items,
    status: ORDER_STATUS.RECEIVED,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return order;
};

export const updateOrderStatus = (id, status) => {
  const order = orders.find((o) => o.id === String(id));
  if (!order) return null;
  if (!STATUS_SEQUENCE.includes(status)) return null;
  order.status = status;
  return order;
};

/** Next status in sequence (for polling); null if already delivered */
export const getNextStatus = (currentStatus) => {
  const idx = STATUS_SEQUENCE.indexOf(currentStatus);
  if (idx === -1 || idx >= STATUS_SEQUENCE.length - 1) return null;
  return STATUS_SEQUENCE[idx + 1];
};
