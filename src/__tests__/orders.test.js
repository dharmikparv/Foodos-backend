import request from 'supertest';
import app from '../index.js';

const validOrder = {
  deliveryDetails: {
    name: 'John Doe',
    address: '123 Main St, City',
    phoneNumber: '+1 555-123-4567',
  },
  items: [
    { menuItemId: '1', quantity: 2 },
    { menuItemId: '2', quantity: 1 },
  ],
};

describe('GET /api/orders', () => {
  it('returns list of all orders (newest first)', async () => {
    const create = await request(app).post('/api/orders').send(validOrder);
    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('orders');
    expect(Array.isArray(res.body.orders)).toBe(true);
    expect(res.body.orders.length).toBeGreaterThanOrEqual(1);
    expect(res.body.orders[0]).toMatchObject({
      id: create.body.id,
      status: 'Order Received',
      deliveryDetails: validOrder.deliveryDetails,
    });
  });
});

describe('POST /api/orders', () => {
  it('creates order with valid data', async () => {
    const res = await request(app).post('/api/orders').send(validOrder);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('deliveryDetails');
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('status', 'Order Received');
    expect(res.body.deliveryDetails.name).toBe('John Doe');
    expect(res.body.items).toHaveLength(2);
  });

  it('rejects order without delivery details', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: validOrder.items });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Validation');
  });

  it('rejects order with invalid name', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        ...validOrder,
        deliveryDetails: { ...validOrder.deliveryDetails, name: 'J' },
      });
    expect(res.status).toBe(400);
  });

  it('rejects order with invalid address', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        ...validOrder,
        deliveryDetails: { ...validOrder.deliveryDetails, address: '123' },
      });
    expect(res.status).toBe(400);
  });

  it('rejects order with invalid phone', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        ...validOrder,
        deliveryDetails: { ...validOrder.deliveryDetails, phoneNumber: 'abc' },
      });
    expect(res.status).toBe(400);
  });

  it('rejects order with empty items', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ ...validOrder, items: [] });
    expect(res.status).toBe(400);
  });

  it('rejects order with invalid quantity', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        ...validOrder,
        items: [{ menuItemId: '1', quantity: 0 }],
      });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/orders/:id', () => {
  it('returns order when found', async () => {
    const create = await request(app).post('/api/orders').send(validOrder);
    const id = create.body.id;
    const res = await request(app).get(`/api/orders/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.status).toBe('Order Received');
  });

  it('returns 404 when order not found', async () => {
    const res = await request(app).get('/api/orders/nonexistent999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Order not found');
  });
});

describe('PATCH /api/orders/:id/status', () => {
  it('updates order status', async () => {
    const create = await request(app).post('/api/orders').send(validOrder);
    const id = create.body.id;
    const res = await request(app)
      .patch(`/api/orders/${id}/status`)
      .send({ status: 'Preparing' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Preparing');
  });

  it('returns 400 for invalid status', async () => {
    const create = await request(app).post('/api/orders').send(validOrder);
    const id = create.body.id;
    const res = await request(app)
      .patch(`/api/orders/${id}/status`)
      .send({ status: 'InvalidStatus' });
    expect(res.status).toBe(400);
  });

  it('returns 404 when order not found', async () => {
    const res = await request(app)
      .patch('/api/orders/nonexistent999/status')
      .send({ status: 'Preparing' });
    expect(res.status).toBe(404);
  });
});

describe('GET /api/orders/:id/next-status', () => {
  it('progresses order to next status', async () => {
    const create = await request(app).post('/api/orders').send(validOrder);
    const id = create.body.id;
    const res = await request(app).get(`/api/orders/${id}/next-status`);
    expect(res.status).toBe(200);
    expect(res.body.order.status).toBe('Preparing');
  });
});
