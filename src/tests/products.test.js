const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const loginRes = await request('http://localhost:3001')
    .post('/auth/login')
    .send({ cpf: '12345678900', password: '1234567' });

  token = loginRes.body.token;
});

describe('Produtos - /products', () => {
  let produtoId;

  it('deve listar produtos', async () => {
    const res = await request('http://localhost:3001')
      .get('/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve criar produto', async () => {
    const novoProduto = {
      nome: 'Produto Teste',
      id_categoria: 1,
      quantidade_estoque: 10,
      preco_compra: 10.50,
      preco_venda: 15.75
    };

    const res = await request('http://localhost:3001')
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(novoProduto);

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Produto Teste');
    expect(res.body.id_categoria).toBe(1);
    produtoId = res.body.id; // salvar para próximos testes
  });

  it('deve buscar produto por ID', async () => {
    if (!produtoId) {
      // Se não temos um produto criado no teste anterior, usar ID existente
      produtoId = 1;
    }

    const res = await request('http://localhost:3001')
      .get(`/products/${produtoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(produtoId);
  });

  it('deve atualizar produto', async () => {
    if (!produtoId) {
      produtoId = 1;
    }

    const dadosAtualizacao = {
      nome: 'Produto Atualizado',
      quantidade_estoque: 20
    };

    const res = await request('http://localhost:3001')
      .put(`/products/${produtoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(dadosAtualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Produto Atualizado');
  });

  it('deve retornar erro ao criar produto sem campos obrigatórios', async () => {
    const produtoIncompleto = {
      nome: 'Produto Incompleto'
      // faltando outros campos obrigatórios
    };

    const res = await request('http://localhost:3001')
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(produtoIncompleto);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Campos obrigatórios ausentes.');
  });

  it('deve retornar erro 404 para produto inexistente', async () => {
    const res = await request('http://localhost:3001')
      .get('/products/999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Produto não encontrado.');
  });

  it('deve retornar erro 401 sem token de autorização', async () => {
    const res = await request('http://localhost:3001')
      .get('/products');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Token não informado.');
  });

  it('deve deletar produto', async () => {
    if (!produtoId) {
      produtoId = 1;
    }

    const res = await request('http://localhost:3001')
      .delete(`/products/${produtoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Produto removido com sucesso.');
  });
});
