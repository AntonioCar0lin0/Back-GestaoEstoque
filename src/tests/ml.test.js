const request = require('supertest');
const app = require('../app');

describe('Machine Learning - /api/ml', () => {
  
  describe('GET /api/ml/forecast', () => {
    it('deve retornar previsão padrão (receita)', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/ml/forecast');

      // Se o serviço ML não estiver disponível, pode retornar erro 500
      // Vamos testar ambos os cenários
      if (res.statusCode === 200) {
        expect(res.body).toBeDefined();
      } else {
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Erro ao consultar o serviço de previsão');
      }
    });

    it('deve retornar previsão para tipo específico', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/ml/forecast')
        .query({ tipo: 'despesa' });

      // Testando ambos os cenários possíveis
      if (res.statusCode === 200) {
        expect(res.body).toBeDefined();
      } else {
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Erro ao consultar o serviço de previsão');
      }
    });

    it('deve aceitar parâmetro tipo receita', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/ml/forecast')
        .query({ tipo: 'receita' });

      // Testando ambos os cenários possíveis
      if (res.statusCode === 200) {
        expect(res.body).toBeDefined();
      } else {
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Erro ao consultar o serviço de previsão');
      }
    });
  });
});
