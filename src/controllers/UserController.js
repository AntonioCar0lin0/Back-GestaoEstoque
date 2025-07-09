/************************************************************
 * ARQUIVO: src/controllers/UserController
 * RESPONSABILIDADE: Funções para criar, buscar, atualizar e deletar um usuário no banco de dados
 ************************************************************/
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/Usuario');
const { Op } = require('sequelize');

module.exports = {
    // Criar um novo usuário
    async create(req, res) {
        const{cpf, password} = req.body

        //validacao da entrada
        if (!cpf||!password){
            return res.status(400).json({error: 'CPF e senha obrigatorios'});
        }
        try {
            
            const hashedPassword = await bcrypt.hash(password, 10);

            const usuario = await User.create({
                cpf,
                password: hashedPassword,
            });
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: error.message });
        }
    },
    async login(req, res){
        const {cpf, password} = req.body;

        //verificar se o user existe

        const user = await User.findOne({where: {cpf}});
        if (!user){
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        //comparar senha criptografada

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login bem-sucedido', token });
    },
    // Listar todos os usuários
    async findAll(req, res) {
        try {
            const usuarios = await User.findAll();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao listar usuários' });
        }
    },

    // Buscar um usuário por ID
    async findById(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar usuário' });
        }
    },

    // Atualizar um usuário
    async update(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            await usuario.update(req.body);
            return res.json(usuario);
        } catch (error) {
            return res.status(400).json({ erro: 'Erro ao atualizar usuário' });
        }
    },

    // Deletar um usuário
    async delete(req, res) {
        try {
            const usuario = await User.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            await usuario.destroy();
            return res.json({ mensagem: 'Usuário deletado com sucesso' });
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao deletar usuário' });
        }
    }
};


