const request = require('supertest');
const app = require('../app');

describe('Integração Completa da API', () => {
  let token;
  let usuarioId;
  let produtoId;
  let categoriaId;
  let transacaoId;
  const timestamp = Date.now();

  // Setup: fazer login e obter token
  beforeAll(async () => {
    const loginRes = await request('http://localhost:3001')
      .post('/auth/login')
      .send({ cpf: '12345678900', password: '1234567' });
    
    if (loginRes.statusCode === 200) {
      token = loginRes.body.token;
    }
  });

  describe('Fluxo Completo da API', () => {
    
    it('1. Deve fazer login e obter token', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/login')
        .send({ cpf: '12345678900', password: '1234567' });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      token = res.body.token;
    });

    it('2. Deve acessar dados do perfil', async () => {
      if (!token) return;

      const res = await request('http://localhost:3001')
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      usuarioId = res.body.id;
    });

    it('3. Deve listar categorias existentes', async () => {
      const res = await request('http://localhost:3001')
        .get('/categories');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        categoriaId = res.body[0].id;
      }
    });

    it('4. Deve criar uma nova categoria', async () => {
      const novaCategoria = {
        nome: `Categoria Teste Integração ${timestamp}`,
        description: 'Categoria criada durante teste de integração',
        color: '#FF5722'
      };

      const res = await request('http://localhost:3001')
        .post('/categories')
        .send(novaCategoria);

      expect(res.statusCode).toBe(201);
      expect(res.body.nome).toBe(novaCategoria.nome);
      categoriaId = res.body.id;
    });

    it('5. Deve criar um novo produto', async () => {
      if (!token || !categoriaId) return;

      const novoProduto = {
        nome: `Produto Teste Integração ${timestamp}`,
        id_categoria: categoriaId,
        quantidade_estoque: 100,
        preco_compra: 25.50,
        preco_venda: 45.00
      };

      const res = await request('http://localhost:3001')
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(novoProduto);

      expect(res.statusCode).toBe(201);
      expect(res.body.nome).toBe(novoProduto.nome);
      produtoId = res.body.id;
    });

    it('6. Deve listar produtos', async () => {
      if (!token) return;

      const res = await request('http://localhost:3001')
        .get('/products')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('7. Deve criar uma transação de receita', async () => {
      if (!token || !categoriaId) return;

      const novaTransacao = {
        tipo: 'receita',
        valor: 150.75,
        descricao: 'Receita de teste de integração',
        id_categoria: categoriaId,
        data: '2025-08-07',
        id_produto: produtoId
      };

      const res = await request('http://localhost:3001')
        .post('/transactions')
        .set('Authorization', `Bearer ${token}`)
        .send(novaTransacao);

      expect(res.statusCode).toBe(201);
      expect(res.body.transaction.tipo).toBe('receita');
      transacaoId = res.body.transaction.id;
    });

    it('8. Deve listar transações do usuário', async () => {
      if (!token) return;

      const res = await request('http://localhost:3001')
        .get('/transactions')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.transactions).toBeDefined();
      expect(Array.isArray(res.body.transactions)).toBe(true);
    });

    it('9. Deve obter resumo do dashboard', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/dashboard/summary');

      expect(res.statusCode).toBe(200);
      expect(res.body.summary).toBeDefined();
      expect(res.body.summary.totalProducts).toBeDefined();
      expect(res.body.summary.totalRevenue).toBeDefined();
    });

    it('10. Deve obter dados de analytics/predictions', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/analytics/predictions');

      expect(res.statusCode).toBe(200);
      expect(res.body.previsao).toBeDefined();
    });

    it('11. Deve atualizar produto criado', async () => {
      if (!token || !produtoId) return;

      const dadosAtualizacao = {
        nome: 'Produto Atualizado Integração',
        quantidade_estoque: 150
      };

      const res = await request('http://localhost:3001')
        .put(`/products/${produtoId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(dadosAtualizacao);

      expect(res.statusCode).toBe(200);
      expect(res.body.nome).toBe('Produto Atualizado Integração');
    });

    it('12. Deve atualizar transação criada', async () => {
      if (!token || !transacaoId) return;

      const dadosAtualizacao = {
        descricao: 'Transação atualizada durante teste de integração',
        valor: 200.00
      };

      const res = await request('http://localhost:3001')
        .put(`/transactions/${transacaoId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(dadosAtualizacao);

      expect(res.statusCode).toBe(200);
      expect(res.body.transaction).toBeDefined();
    });

    // Cleanup: deletar recursos criados
    it('13. Deve deletar transação criada', async () => {
      if (!token || !transacaoId) return;

      const res = await request('http://localhost:3001')
        .delete(`/transactions/${transacaoId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Transação deletada com sucesso.');
    });

    it('14. Deve deletar produto criado', async () => {
      if (!token || !produtoId) return;

      const res = await request('http://localhost:3001')
        .delete(`/products/${produtoId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Produto removido com sucesso.');
    });

    it('15. Deve deletar categoria criada', async () => {
      if (!categoriaId) return;

      const res = await request('http://localhost:3001')
        .delete(`/categories/${categoriaId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Categoria removida com sucesso.');
    });
  });

  describe('Testes de Segurança e Validação', () => {
    
    it('Deve rejeitar requisições sem autenticação nas rotas protegidas', async () => {
      const routesProtegidas = [
        '/products',
        '/transactions',
        '/api/user/profile'
      ];

      for (const route of routesProtegidas) {
        const res = await request('http://localhost:3001').get(route);
        expect(res.statusCode).toBe(401);
      }
    });

    it('Deve rejeitar dados inválidos na criação de recursos', async () => {
      if (!token) return;

      // Produto sem campos obrigatórios
      const produtoInvalido = { nome: 'Teste' };
      const resProduto = await request('http://localhost:3001')
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(produtoInvalido);
      
      expect(resProduto.statusCode).toBe(400);

      // Transação sem campos obrigatórios
      const transacaoInvalida = { tipo: 'receita' };
      const resTransacao = await request('http://localhost:3001')
        .post('/transactions')
        .set('Authorization', `Bearer ${token}`)
        .send(transacaoInvalida);
      
      expect(resTransacao.statusCode).toBe(400);
    });

    it('Deve retornar 404 para recursos inexistentes', async () => {
      if (!token) return;

      const routes404 = [
        '/products/99999',
        '/transactions/99999'
      ];

      for (const route of routes404) {
        const res = await request('http://localhost:3001')
          .get(route)
          .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
      }
    });
  });
});
