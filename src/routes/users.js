/************************************************************
 * ARQUIVO: src/routes/user.js
 * RESPONSABILIDADE: Definição das rotas de Usuario
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const UserController = require('../controllers/UserController');

// Cria um novo usuário
router.post('/', UserController.create);

//Retorna todos os usuários
router.get('/', UserController.findAll);

//Buscar usuários por ID
router.get('/:id', UserController.findById);

//Deleta um usuário por ID 
router.delete('/:id', UserController.delete);

// Atualiza um usuário por ID 
router.put('/:id', UserController.update);

// Exporta o router para ser usado no app.js
module.exports = router;