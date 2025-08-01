//Rotas de autenticação: /auth/register e /auth/login

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password',   AuthController.resetPassword);
module.exports = router;
