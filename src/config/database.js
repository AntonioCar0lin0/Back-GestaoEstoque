/************************************************************
Realiza a configuração / conexão com o database através da biblioteca Sequelize
 ************************************************************/
const { Sequelize } = require('sequelize');

require('dotenv').config();
console.log('DB_DIALECT:', process.env.DB_DIALECT);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, { //Nome do banco, usuario e senha do .env
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT || 5432, // padrão caso não esteja no .env
    logging: false, // Mude para true se quiser ver as queries
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // necessário para conectar ao Render sem erro de certificado
      }
    }
});

// Teste de conexão padrão e mensagem de erro
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o PostgreSQL foi estabelecida');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao PostgreSQL:', error);
  });

module.exports = sequelize; // Exportar para usar em outros arquivos
