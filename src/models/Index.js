const Produto = require('./Produto');
const Usuario = require('./Usuario');
const Venda = require('./Venda');
const ItemVenda = require('./ItemVenda');
const Transacao = require('./Transacao');
const Categoria = require('./Categoria');


// 1. Usuario e Venda
Usuario.hasMany(Venda, { foreignKey: 'id_usuario' });
Venda.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// 2. Produto e Categoria
Categoria.hasMany(Produto, { foreignKey: 'id_categoria' });
Produto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// 3. Transacao e Categoria
Categoria.hasMany(Transacao, { foreignKey: 'id_categoria' });
Transacao.belongsTo(Categoria, { foreignKey: 'id_categoria' });

// 4. Transacao e Usuario
Usuario.hasMany(Transacao, { foreignKey: 'id_usuario' });
Transacao.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// 5. Transacao e Produto
Produto.hasMany(Transacao, { foreignKey: 'id_produto' });
Transacao.belongsTo(Produto, { foreignKey: 'id_produto' });

// 6. Produto e Usuario (criador do produto)
Usuario.hasMany(Produto, { foreignKey: 'id_usuario_criador' });
Produto.belongsTo(Usuario, { foreignKey: 'id_usuario_criador' });

// 7. ItemVenda, Produto e Venda
Produto.hasMany(ItemVenda, { foreignKey: 'id_produto' });
ItemVenda.belongsTo(Produto, { foreignKey: 'id_produto' });

Venda.hasMany(ItemVenda, { foreignKey: 'id_venda' });
ItemVenda.belongsTo(Venda, { foreignKey: 'id_venda' });


module.exports = {
  Produto,
  Usuario,
  Venda,
  ItemVenda,
  Categoria,
  Transacao
};
