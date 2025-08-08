//realizar alteraçoes necessarias posteriormente
const { Sequelize } = require('sequelize');
const { Produto, Venda } = require('../models/Index');
const sequelize = require('../config/database');

exports.timeSeries = async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('data_venda')), 'mes'],
        [sequelize.fn('sum', sequelize.col('valor')), 'total_vendas'],
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('data_venda'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('data_venda')), 'ASC']],
    });

    return res.json(vendas);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// previsão com base na média móvel
exports.predictions = async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('valor')), 'total_vendas']],
      group: ['data_venda'],
      order: [['data_venda', 'ASC']],
    });

    // Algoritmo de média móvel
    const previsao = vendas.reduce((acc, curr) => acc + curr.total_vendas, 0) / vendas.length;

    return res.json({ previsao });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Recomendações de IA baseadas nos produtos
exports.getRecommendations = async (req, res) => {
  try {
    const { id_usuario } = req.query;
    
    // Buscar todos os produtos para análise
    const produtos = await Produto.findAll();
    
    if (!produtos || produtos.length === 0) {
      return res.json({
        recomendacoes: [],
        insights: ["Nenhum produto encontrado para análise."]
      });
    }

    // Análise dos produtos
    const produtosComAnalise = produtos.map(produto => {
      const lucroUnitario = parseFloat(produto.preco_venda) - parseFloat(produto.preco_compra);
      const margem = (lucroUnitario / parseFloat(produto.preco_venda)) * 100;
      const estoqueValor = produto.quantidade_estoque * parseFloat(produto.preco_compra);
      
      return {
        ...produto.toJSON(),
        lucro_unitario: lucroUnitario,
        margem_lucro: margem,
        valor_estoque: estoqueValor
      };
    });

    // Gerar recomendações baseadas em dados
    const recomendacoes = [];
    const insights = [];

    // 1. Produtos com estoque baixo
    const estoquesBaixos = produtosComAnalise.filter(p => p.quantidade_estoque < 50);
    if (estoquesBaixos.length > 0) {
      recomendacoes.push({
        tipo: "estoque",
        titulo: "Reabastecer Estoque",
        descricao: `${estoquesBaixos.length} produto(s) com estoque baixo`,
        produtos: estoquesBaixos.slice(0, 3).map(p => p.nome),
        prioridade: "alta"
      });
      insights.push(`Você tem ${estoquesBaixos.length} produtos com estoque abaixo de 50 unidades.`);
    }

    // 2. Produtos mais lucrativos
    const maisLucrativos = produtosComAnalise
      .filter(p => p.lucro_unitario > 0)
      .sort((a, b) => b.lucro_unitario - a.lucro_unitario)
      .slice(0, 5);
    
    if (maisLucrativos.length > 0) {
      recomendacoes.push({
        tipo: "promocao",
        titulo: "Focar em Produtos Lucrativos",
        descricao: `Promover produtos com maior margem de lucro`,
        produtos: maisLucrativos.slice(0, 3).map(p => p.nome),
        prioridade: "media"
      });
      
      const melhorProduto = maisLucrativos[0];
      insights.push(`Seu produto mais lucrativo é "${melhorProduto.nome}" com R$ ${melhorProduto.lucro_unitario.toFixed(2)} de lucro por unidade.`);
    }

    // 3. Análise de categoria
    const categorias = {};
    produtosComAnalise.forEach(produto => {
      if (!categorias[produto.categoria]) {
        categorias[produto.categoria] = {
          quantidade: 0,
          lucro_total: 0,
          produtos: []
        };
      }
      categorias[produto.categoria].quantidade += produto.quantidade_estoque;
      categorias[produto.categoria].lucro_total += produto.lucro_unitario * produto.quantidade_estoque;
      categorias[produto.categoria].produtos.push(produto.nome);
    });

    const melhorCategoria = Object.entries(categorias)
      .sort(([,a], [,b]) => b.lucro_total - a.lucro_total)[0];
    
    if (melhorCategoria) {
      recomendacoes.push({
        tipo: "categoria",
        titulo: "Categoria de Destaque",
        descricao: `A categoria "${melhorCategoria[0]}" é a mais lucrativa`,
        produtos: melhorCategoria[1].produtos.slice(0, 3),
        prioridade: "baixa"
      });
      
      insights.push(`A categoria "${melhorCategoria[0]}" gera o maior lucro total potencial de R$ ${melhorCategoria[1].lucro_total.toFixed(2)}.`);
    }

    // 4. Produtos com alta margem
    const altaMargem = produtosComAnalise
      .filter(p => p.margem_lucro > 50)
      .sort((a, b) => b.margem_lucro - a.margem_lucro);
    
    if (altaMargem.length > 0) {
      insights.push(`Você tem ${altaMargem.length} produtos com margem de lucro acima de 50%.`);
    }

    // 5. Valor total do estoque
    const valorTotalEstoque = produtosComAnalise.reduce((acc, p) => acc + p.valor_estoque, 0);
    insights.push(`Valor total investido em estoque: R$ ${valorTotalEstoque.toFixed(2)}.`);

    return res.json({
      recomendacoes,
      insights,
      estatisticas: {
        total_produtos: produtos.length,
        produtos_estoque_baixo: estoquesBaixos.length,
        valor_total_estoque: valorTotalEstoque,
        categoria_mais_lucrativa: melhorCategoria ? melhorCategoria[0] : "N/A"
      }
    });

  } catch (err) {
    console.error('Erro ao gerar recomendações:', err);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      recomendacoes: [],
      insights: ["Não foi possível gerar recomendações no momento."]
    });
  }
};
