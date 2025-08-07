const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const loginRes = await request('http://localhost:3001')
    .post('/auth/login')
    .send({ cpf: '12345678900', password: '1234567' });

  token = loginRes.body.token;
});

describe('Transações - /transactions', () => {
  let transacaoId;

  it('deve listar transações do usuário', async () => {
    const res = await request('http://localhost:3001')
      .get('/transactions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions).toBeDefined();
    expect(Array.isArray(res.body.transactions)).toBe(true);
  });

  it('deve criar nova transação', async () => {
    const novaTransacao = {
      tipo: 'receita',
      valor: 150.50,
      descricao: 'Teste automático de receita',
      id_categoria: 1,
      data: '2025-08-07'
    };

    const res = await request('http://localhost:3001')
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(novaTransacao);

    expect(res.statusCode).toBe(201);
    expect(res.body.transaction).toBeDefined();
    expect(res.body.transaction.tipo).toBe('receita');
    expect(parseFloat(res.body.transaction.valor)).toBe(150.50);
    transacaoId = res.body.transaction.id;
  });

  it('deve criar transação de despesa', async () => {
    const novaTransacao = {
      tipo: 'despesa',
      valor: 75.25,
      descricao: 'Teste automático de despesa',
      id_categoria: 1,
      data: '2025-08-07',
      id_produto: 1
    };

    const res = await request('http://localhost:3001')
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(novaTransacao);

    expect(res.statusCode).toBe(201);
    expect(res.body.transaction.tipo).toBe('despesa');
    expect(parseFloat(res.body.transaction.valor)).toBe(75.25);
  });

  it('deve buscar transação por ID', async () => {
    if (!transacaoId) {
      transacaoId = 1; // usar transação existente se não criamos uma
    }

    const res = await request('http://localhost:3001')
      .get(`/transactions/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transaction).toBeDefined();
    expect(res.body.transaction.id).toBe(transacaoId);
  });

  it('deve atualizar transação', async () => {
    if (!transacaoId) {
      transacaoId = 1;
    }

    const dadosAtualizacao = {
      descricao: 'Transação atualizada',
      valor: 200.00
    };

    const res = await request('http://localhost:3001')
      .put(`/transactions/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dadosAtualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body.transaction).toBeDefined();
  });

  it('deve filtrar transações por data', async () => {
    const res = await request('http://localhost:3001')
      .get('/transactions')
      .query({
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions).toBeDefined();
  });

  it('deve filtrar transações por tipo', async () => {
    const res = await request('http://localhost:3001')
      .get('/transactions')
      .query({
        type: 'receita'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.transactions).toBeDefined();
  });

  it('deve retornar erro ao criar transação sem campos obrigatórios', async () => {
    const transacaoIncompleta = {
      tipo: 'receita'
      // faltando outros campos obrigatórios
    };

    const res = await request('http://localhost:3001')
      .post('/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send(transacaoIncompleta);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Campos obrigatórios ausentes.');
  });

  it('deve retornar erro 404 para transação inexistente', async () => {
    const res = await request('http://localhost:3001')
      .get('/transactions/999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Transação não encontrada.');
  });

  it('deve retornar erro 401 sem token de autorização', async () => {
    const res = await request('http://localhost:3001')
      .get('/transactions');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token não informado.');
  });

  it('deve deletar transação', async () => {
    if (!transacaoId) {
      transacaoId = 1;
    }

    const res = await request('http://localhost:3001')
      .delete(`/transactions/${transacaoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Transação deletada com sucesso.');
  });
});
