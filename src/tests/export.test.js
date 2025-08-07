const request = require('supertest');
const app = require('../app');

describe('Export - /api/export', () => {
  
  describe('GET /api/export/reports', () => {
    it('deve exportar relatório em formato CSV', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/export/reports');

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('text/csv; charset=utf-8');
      expect(res.headers['content-disposition']).toContain('attachment; filename="relatorio.csv"');
      expect(typeof res.text).toBe('string');
    });

    it('deve retornar CSV com dados do relatório', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/export/reports');

      expect(res.statusCode).toBe(200);
      const csvContent = res.text;
      expect(csvContent).toContain('id');
      expect(csvContent).toContain('tipo');
      expect(csvContent).toContain('valor');
      expect(csvContent).toContain('usuario');
    });
  });
});
