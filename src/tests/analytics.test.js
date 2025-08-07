const request = require('supertest');
const app = require('../app');

describe('Analytics - /api/analytics', () => {
  
  describe('GET /api/analytics/predictions', () => {
    it('deve retornar previsões', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/analytics/predictions');

      expect(res.statusCode).toBe(200);
      expect(res.body.previsao).toBeDefined();
      expect(typeof res.body.previsao).toBe('number');
    });

    it('deve retornar previsão maior ou igual a zero', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/analytics/predictions');

      expect(res.statusCode).toBe(200);
      expect(res.body.previsao).toBeGreaterThanOrEqual(0);
    });
  });
});
