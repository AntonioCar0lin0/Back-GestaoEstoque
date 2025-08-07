// Setup global para testes
require('dotenv').config();

// Aumentar timeout para testes que fazem requisições HTTP
jest.setTimeout(30000);

// Configurações globais para testes
global.baseURL = 'http://localhost:3001';

// Mock console.log durante os testes para não poluir a saída
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
};

// Setup para executar antes de todos os testes
beforeAll(async () => {
  // Aguardar um pouco para garantir que o servidor esteja rodando
  await new Promise(resolve => setTimeout(resolve, 2000));
});

// Cleanup após todos os testes
afterAll(async () => {
  // Aguardar um pouco antes de finalizar
  await new Promise(resolve => setTimeout(resolve, 1000));
});
