/************************************************************
  Inicializa a aplicação e carrega as rotas da API
 ************************************************************/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


// Importa nossa conexão com o banco
const sequelize = require('./config/database');

// Importando as rotas 
const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const dashboardRoutes = require('./routes/dashboard');
const analyticsRoutes = require('./routes/analytics');
const exportRoutes = require('./routes/export');

// Importa os models 
require('./models/Produto');
require('./models/Usuario');
require('./models/Venda');
require('./models/ItemVenda');

// Sincroniza com o banco 
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas: ', err);
  });

// Configura o Express para interpretar JSON do body
app.use(express.json());


// Rota de teste para o CORS
app.get('/', (req, res) => {
  res.send('API funcionando com CORS!');
});

// Aplicando a utilização das rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productsRoutes)
app.use('/api/user', profileRoutes);
app.use('/api', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/export', exportRoutes);


// iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
