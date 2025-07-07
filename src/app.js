/************************************************************
  Inicializa a aplicação e carrega as rotas da API
 ************************************************************/
require('dotenv').config(); 

const express = require('express');
const app = express();

// Importa nossa conexão com o banco
const sequelize = require('./config/database');

// Importando as rotas 
const userRoutes = require('./routes/users');


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

/**********************
 * Exemplo para quando colocarmos em produção*
   //Importa e usa as rotas de produto
const productRoutes = require('./routes/products');
  //Todas as rotas definidas em productRoutes vão ter como prefixo "/products"
app.use('/products', productRoutes);
 */

app.use('/users', userRoutes);


// iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
