const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  it('should return a welcome message on the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Hello, DevOps World');
  });

  it('should return status OK on the health endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });
});
