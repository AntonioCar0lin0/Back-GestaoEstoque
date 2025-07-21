const sequelize = require('../config/database');
const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const Usuario = require('../models/Usuario');
const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const Transacao = require('../models/Transacao');

async function seed() {
  try {
    await sequelize.sync(); // Sem apagar nada

    // === Categorias ===
    const categoriasData = ['Alimentos', 'Bebidas', 'Limpeza', 'Higiene', 'Papelaria', 'Petshop'];
    const categorias = {};
    for (const nome of categoriasData) {
      const [cat] = await Categoria.findOrCreate({ where: { nome } });
      categorias[nome] = cat;
    }

    // === Produtos ===
    const produtosData = [
      { nome: 'Arroz', categoria: 'Alimentos', estoque: 200, compra: 3.20, venda: 5.00 },
      { nome: 'Feijão', categoria: 'Alimentos', estoque: 150, compra: 4.00, venda: 6.50 },
      { nome: 'Coca-Cola 2L', categoria: 'Bebidas', estoque: 100, compra: 5.50, venda: 8.00 },
      { nome: 'Sabão em pó', categoria: 'Limpeza', estoque: 80, compra: 7.00, venda: 10.00 },
      { nome: 'Shampoo', categoria: 'Higiene', estoque: 50, compra: 6.00, venda: 9.50 },
      { nome: 'Caneta azul', categoria: 'Papelaria', estoque: 500, compra: 0.80, venda: 1.50 },
      { nome: 'Ração gato 10kg', categoria: 'Petshop', estoque: 30, compra: 70.00, venda: 120.00 }
    ];

    const produtos = {};
    for (const p of produtosData) {
      const [prod] = await Produto.findOrCreate({
        where: { nome: p.nome },
        defaults: {
          categoria: p.categoria,
          quantidade_estoque: p.estoque,
          preco_compra: p.compra,
          preco_venda: p.venda
        }
      });
      produtos[p.nome] = prod;
    }

    // === Usuários ===
    const usuariosData = [
      {
        nome: 'João Silva', email: 'joao@example.com', cpf: '12345678901',
        senha: 'senha123', nascimento: '1990-01-01', rua: 'Rua das Flores', cidade: 'Recife',
        bairro: 'Centro', pais: 'Brasil'
      },
      {
        nome: 'Maria Souza', email: 'maria@example.com', cpf: '98765432100',
        senha: 'segura456', nascimento: '1985-05-20', rua: 'Av. Boa Viagem', cidade: 'Recife',
        bairro: 'Boa Viagem', pais: 'Brasil'
      },
      {
        nome: 'Carlos Lima', email: 'carlos@example.com', cpf: '11122233344',
        senha: 'abc123', nascimento: '1995-07-10', rua: 'Rua do Sol', cidade: 'Olinda',
        bairro: 'Carmo', pais: 'Brasil'
      }
    ];

    const usuarios = {};
    for (const u of usuariosData) {
      const [usuario] = await Usuario.findOrCreate({
        where: { email: u.email },
        defaults: {
          nome: u.nome, cpf: u.cpf, password: u.senha,
          data_nascimento: u.nascimento, rua: u.rua, cidade: u.cidade,
          bairro: u.bairro, pais: u.pais
        }
      });
      usuarios[u.nome] = usuario;
    }

    // === Vendas e Itens ===
    const vendas = [
      {
        usuario: 'João Silva',
        itens: [
          { produto: 'Arroz', qtd: 10 },
          { produto: 'Feijão', qtd: 5 }
        ]
      },
      {
        usuario: 'Maria Souza',
        itens: [
          { produto: 'Coca-Cola 2L', qtd: 3 },
          { produto: 'Sabão em pó', qtd: 2 },
          { produto: 'Caneta azul', qtd: 20 }
        ]
      },
      {
        usuario: 'Carlos Lima',
        itens: [
          { produto: 'Ração gato 10kg', qtd: 1 },
          { produto: 'Shampoo', qtd: 2 }
        ]
      }
    ];

    for (const v of vendas) {
      let custo = 0;
      let receita = 0;

      for (const item of v.itens) {
        const p = produtos[item.produto];
        receita += item.qtd * parseFloat(p.preco_venda);
        custo += item.qtd * parseFloat(p.preco_compra);
      }

      const venda = await Venda.create({
        data_venda: new Date(),
        receita,
        custo,
        lucro: receita - custo,
        id_usuario: usuarios[v.usuario].id
      });

      for (const item of v.itens) {
        const p = produtos[item.produto];
        await ItemVenda.create({
          quantidade: item.qtd,
          preco_unitario: p.preco_venda,
          subtotal: item.qtd * parseFloat(p.preco_venda),
          id_produto: p.id,
          id_venda: venda.id
        });

        await Transacao.create({
          tipo: 'receita',
          valor: item.qtd * parseFloat(p.preco_venda),
          descricao: `Venda de ${item.qtd}x ${p.nome}`,
          categoria: p.categoria,
          data: new Date(),
          produtoId: p.id
        });
      }
    }

    console.log('✅ Seed populado com sucesso com mais dados!');
  } catch (err) {
    console.error('❌ Erro no seed:', err);
  } finally {
    await sequelize.close();
  }
}

seed();
