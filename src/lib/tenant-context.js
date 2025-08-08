// Contexto por requisição para armazenar userId sem tocar em controllers/front.
const { AsyncLocalStorage } = require('async_hooks');

const als = new AsyncLocalStorage();

function runWithUser(userId, fn) {
  als.run(new Map([['userId', userId]]), fn);
}

function getUserId() {
  const store = als.getStore();
  return store ? store.get('userId') ?? null : null;
}

module.exports = { runWithUser, getUserId };
