import request from 'supertest';
import app from '../index.js';

describe('GET /api/menu', () => {
  it('returns menu items', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body.items[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number),
      image: expect.any(String),
    });
  });
});
