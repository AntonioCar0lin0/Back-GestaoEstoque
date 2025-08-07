const request = require('supertest');
const app = require('../app');

describe('Autenticação - /auth', () => {
  
  describe('POST /auth/register', () => {
    it('deve registrar um novo usuário', async () => {
      const novoUsuario = {
        nome: 'Usuario Registro',
        email: 'registro@test.com',
        cpf: '99988877766',
        password: 'senha123',
        data_nascimento: '1995-05-15',
        rua: 'Rua do Registro',
        cidade: 'Recife',
        bairro: 'Boa Viagem',
        pais: 'Brasil'
      };

      const res = await request('http://localhost:3001')
        .post('/auth/register')
        .send(novoUsuario);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Usuário criado com sucesso');
      expect(res.body.id).toBeDefined();
    });

    it('deve retornar erro ao tentar registrar com CPF duplicado', async () => {
      const usuarioExistente = {
        nome: 'Usuario Duplicado',
        email: 'duplicado@test.com',
        cpf: '99988877766', // mesmo CPF do teste anterior
        password: 'senha123',
        data_nascimento: '1995-05-15',
        rua: 'Rua do Duplicado',
        cidade: 'Recife',
        bairro: 'Boa Viagem',
        pais: 'Brasil'
      };

      const res = await request('http://localhost:3001')
        .post('/auth/register')
        .send(usuarioExistente);

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toBe('CPF já cadastrado.');
    });

    it('deve retornar erro com campos obrigatórios faltando', async () => {
      const usuarioIncompleto = {
        nome: 'Usuario Incompleto'
        // faltando outros campos obrigatórios
      };

      const res = await request('http://localhost:3001')
        .post('/auth/register')
        .send(usuarioIncompleto);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Campos obrigatórios faltando.');
    });
  });

  describe('POST /auth/login', () => {
    it('deve retornar token com CPF e senha corretos', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/login')
        .send({
          cpf: '12345678900',
          password: '1234567'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it('deve retornar erro com CPF inválido', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/login')
        .send({
          cpf: '00000000000',
          password: 'senha123'
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Usuário não encontrado.');
    });

    it('deve retornar erro com senha incorreta', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/login')
        .send({
          cpf: '12345678900',
          password: 'senhaerrada'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Senha incorreta.');
    });

    it('deve retornar erro sem CPF ou senha', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/login')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('CPF e senha obrigatórios.');
    });
  });

  describe('POST /auth/reset-password', () => {
    it('deve retornar erro com token inválido', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/reset-password')
        .send({
          token: 'token-invalido',
          newPassword: 'novasenha123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Token inválido ou expirado.');
    });

    it('deve retornar erro sem token ou nova senha', async () => {
      const res = await request('http://localhost:3001')
        .post('/auth/reset-password')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Token e nova senha são obrigatórios.');
    });
  });
});
