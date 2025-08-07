const request = require('supertest');
const app = require('../app');

describe('Dashboard - /api/dashboard', () => {
  
  describe('GET /api/dashboard/summary', () => {
    it('deve retornar resumo do dashboard', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/dashboard/summary');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.summary).toBeDefined();
      expect(res.body.summary.totalProducts).toBeDefined();
      expect(res.body.summary.lowStockProducts).toBeDefined();
      expect(res.body.summary.totalRevenue).toBeDefined();
      expect(res.body.summary.totalExpenses).toBeDefined();
      expect(res.body.summary.profit).toBeDefined();
      expect(res.body.summary.recentTransactions).toBeDefined();
      expect(Array.isArray(res.body.summary.recentTransactions)).toBe(true);
    });

    it('deve retornar valores numéricos válidos no resumo', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/dashboard/summary');

      expect(res.statusCode).toBe(200);
      
      const { summary } = res.body;
      expect(typeof summary.totalProducts).toBe('number');
      expect(typeof summary.lowStockProducts).toBe('number');
      expect(summary.totalProducts).toBeGreaterThanOrEqual(0);
      expect(summary.lowStockProducts).toBeGreaterThanOrEqual(0);
    });

    it('deve retornar lista de transações recentes limitada', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/dashboard/summary');

      expect(res.statusCode).toBe(200);
      expect(res.body.summary.recentTransactions.length).toBeLessThanOrEqual(5);
    });
  });
});
