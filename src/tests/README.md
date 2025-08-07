# Testes da API de Gestão de Estoque

Este projeto contém uma suíte completa de testes automatizados para todas as rotas da API.

## Estrutura dos Testes

### Arquivos de Teste

- `auth.test.js` - Testes de autenticação (login, registro, recuperação de senha)
- `users.test.js` - Testes de CRUD de usuários
- `products.test.js` - Testes de CRUD de produtos
- `categories.test.js` - Testes de CRUD de categorias
- `transactions.test.js` - Testes de CRUD de transações
- `profile.test.js` - Testes de perfil do usuário
- `dashboard.test.js` - Testes do dashboard e resumos
- `analytics.test.js` - Testes de analytics e previsões
- `export.test.js` - Testes de exportação de dados
- `ml.test.js` - Testes do serviço de Machine Learning
- `integration.test.js` - Testes de integração completa

### Configuração

- `setup.js` - Configuração global dos testes
- `jest.config.js` - Configuração do Jest

## Como Executar os Testes

### Pré-requisitos

1. Certifique-se de que o servidor esteja rodando:
   ```bash
   npm start
   # ou
   docker compose up
   ```

2. O banco de dados deve estar configurado e populado com dados de teste.

### Comandos de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta quando arquivos mudam)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage

# Executar testes específicos
npm run test:auth          # Apenas testes de autenticação
npm run test:products      # Apenas testes de produtos
npm run test:transactions  # Apenas testes de transações
npm run test:categories    # Apenas testes de categorias
npm run test:integration   # Apenas teste de integração completa

# Executar teste específico
npx jest src/tests/auth.test.js
```

## Rotas Testadas

### Autenticação `/auth`
- ✅ POST `/auth/register` - Registro de usuário
- ✅ POST `/auth/login` - Login de usuário
- ✅ POST `/auth/reset-password` - Reset de senha

### Usuários `/users`
- ✅ POST `/users` - Criar usuário
- ✅ GET `/users` - Listar usuários
- ✅ GET `/users/:id` - Buscar usuário por ID
- ✅ PUT `/users/:id` - Atualizar usuário
- ✅ DELETE `/users/:id` - Deletar usuário

### Produtos `/products` (Requer autenticação)
- ✅ POST `/products` - Criar produto
- ✅ GET `/products` - Listar produtos
- ✅ GET `/products/:id` - Buscar produto por ID
- ✅ PUT `/products/:id` - Atualizar produto
- ✅ DELETE `/products/:id` - Deletar produto

### Categorias `/categories`
- ✅ GET `/categories` - Listar categorias
- ✅ POST `/categories` - Criar categoria
- ✅ PUT `/categories/:id` - Atualizar categoria
- ✅ DELETE `/categories/:id` - Deletar categoria

### Transações `/transactions` (Requer autenticação)
- ✅ POST `/transactions` - Criar transação
- ✅ GET `/transactions` - Listar transações
- ✅ GET `/transactions/:id` - Buscar transação por ID
- ✅ PUT `/transactions/:id` - Atualizar transação
- ✅ DELETE `/transactions/:id` - Deletar transação

### Perfil `/api/user` (Requer autenticação)
- ✅ GET `/api/user/profile` - Obter dados do perfil
- ✅ PUT `/api/user/profile` - Atualizar perfil
- ✅ PUT `/api/user/password` - Alterar senha

### Dashboard `/api/dashboard`
- ✅ GET `/api/dashboard/summary` - Resumo do dashboard

### Analytics `/api/analytics`
- ✅ GET `/api/analytics/predictions` - Previsões


### Export `/api/export`
- ✅ GET `/api/export/reports` - Exportar relatórios (CSV)


### Machine Learning `/api/ml`
- ✅ GET `/api/ml/forecast` - Previsões ML

## Tipos de Teste

### Testes Unitários
- Testam endpoints individuais
- Verificam responses esperados
- Validam estrutura de dados
- Testam casos de erro

### Testes de Integração
- Testam fluxo completo da aplicação
- Verificam interação entre diferentes endpoints
- Testam cenários reais de uso

### Testes de Segurança
- Verificam autenticação e autorização
- Testam proteção de rotas
- Validam tratamento de dados inválidos

## Cobertura de Testes

Os testes cobrem:
- ✅ Todos os endpoints principais
- ✅ Casos de sucesso
- ✅ Casos de erro (400, 401, 404, 500)
- ✅ Validação de dados
- ✅ Autenticação e autorização
- ✅ Estrutura de resposta
- ✅ Headers de response
- ✅ Filtros e queries

## Dados de Teste

Os testes utilizam:
- Usuário padrão com CPF: `12345678900` e senha: `1234567`
- Criação dinâmica de recursos para testes
- Cleanup automático de dados criados
- Dados mockados quando necessário

## Observações

- Os testes assumem que o servidor está rodando na porta 3001
- É necessário ter dados de seed no banco para alguns testes
- Alguns testes podem falhar se o serviço ML externo não estiver disponível
- Os testes são independentes e podem ser executados em qualquer ordem
