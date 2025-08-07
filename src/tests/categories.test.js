const request = require('supertest');
const app = require('../app');

describe('Categorias - /categories', () => {
  let categoriaId;
  const timestamp = Date.now();

  it('deve listar categorias', async () => {
    const res = await request('http://localhost:3001').get('/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve criar nova categoria', async () => {
    const novaCategoria = {
      nome: `Categoria Teste ${timestamp}`, // nome único
      description: 'Descrição de teste',
      color: '#123456'
    };

    const res = await request('http://localhost:3001')
      .post('/categories')
      .send(novaCategoria);

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe(`Categoria Teste ${timestamp}`);
    expect(res.body.description).toBe('Descrição de teste');
    expect(res.body.color).toBe('#123456');
    categoriaId = res.body.id;
  });

  it('deve atualizar categoria existente', async () => {
    if (!categoriaId) {
      categoriaId = 1; // usar categoria existente se não criamos uma no teste anterior
    }

    const dadosAtualizacao = {
      nome: `Categoria Atualizada ${timestamp}`,
      description: 'Nova descrição',
      color: '#654321'
    };

    const res = await request('http://localhost:3001')
      .put(`/categories/${categoriaId}`)
      .send(dadosAtualizacao);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe(`Categoria Atualizada ${timestamp}`);
  });

  it('deve retornar erro ao criar categoria sem nome', async () => {
    const categoriaInvalida = {
      description: 'Sem nome',
      color: '#FF0000'
    };

    const res = await request('http://localhost:3001')
      .post('/categories')
      .send(categoriaInvalida);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Nome é obrigatório.');
  });

  it('deve retornar erro ao criar categoria com nome duplicado', async () => {
    const categoriaDuplicada = {
      nome: `Categoria Teste ${timestamp}`, // mesmo nome do primeiro teste
      description: 'Categoria duplicada'
    };

    const res = await request('http://localhost:3001')
      .post('/categories')
      .send(categoriaDuplicada);

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Categoria já existe.');
  });

  it('deve retornar erro 404 para categoria inexistente', async () => {
    const res = await request('http://localhost:3001')
      .put('/categories/999')
      .send({
        nome: 'Categoria Inexistente'
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Categoria não encontrada.');
  });

  it('deve deletar categoria', async () => {
    if (!categoriaId) {
      categoriaId = 1;
    }

    const res = await request('http://localhost:3001')
      .delete(`/categories/${categoriaId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Categoria removida com sucesso.');
  });
});
