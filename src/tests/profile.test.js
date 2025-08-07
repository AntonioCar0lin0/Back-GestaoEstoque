const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const loginRes = await request('http://localhost:3001')
    .post('/auth/login')
    .send({ cpf: '12345678900', password: '1234567' });

  token = loginRes.body.token;
});

describe('Perfil - /api/user', () => {
  
  describe('GET /api/user/profile', () => {
    it('deve retornar dados do perfil do usuário autenticado', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.nome).toBeDefined();
      expect(res.body.email).toBeDefined();
      expect(res.body.cpf).toBeDefined();
    });

    it('deve retornar erro 401 sem token', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/user/profile');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Token não informado.');
    });

    it('deve retornar erro 401 com token inválido', async () => {
      const res = await request('http://localhost:3001')
        .get('/api/user/profile')
        .set('Authorization', 'Bearer token-invalido');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Token inválido ou expirado.');
    });
  });

  describe('PUT /api/user/profile', () => {
    it('deve atualizar dados do perfil', async () => {
      const dadosAtualizacao = {
        nome: 'Nome Atualizado Teste',
        rua: 'Nova Rua de Teste',
        cidade: 'Nova Cidade'
      };

      const res = await request('http://localhost:3001')
        .put('/api/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .send(dadosAtualizacao);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Perfil atualizado com sucesso.');
    });

    it('deve retornar erro 401 sem token', async () => {
      const res = await request('http://localhost:3001')
        .put('/api/user/profile')
        .send({ nome: 'Teste' });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Token não informado.');
    });
  });

  describe('PUT /api/user/password', () => {
    it('deve retornar erro com senha atual incorreta', async () => {
      const dadosSenha = {
        currentPassword: 'senhaerrada',
        newPassword: 'novasenha123'
      };

      const res = await request('http://localhost:3001')
        .put('/api/user/password')
        .set('Authorization', `Bearer ${token}`)
        .send(dadosSenha);

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Senha atual incorreta.');
    });

    it('deve retornar erro sem senha atual ou nova senha', async () => {
      const res = await request('http://localhost:3001')
        .put('/api/user/password')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Senha atual e nova senha são obrigatórias.');
    });

    it('deve retornar erro 401 sem token', async () => {
      const res = await request('http://localhost:3001')
        .put('/api/user/password')
        .send({
          currentPassword: 'senha123',
          newPassword: 'novasenha123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Token não informado.');
    });
  });
});
