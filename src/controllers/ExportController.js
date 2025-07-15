const { Parser } = require('json2csv');

exports.products = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    const csv = new Parser().parse(produtos);

    res.header('Content-Type', 'text/csv');
    res.attachment('produtos.csv');
    return res.send(csv);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.transactions = async (req, res) => {
  try {
    const transacoes = await Transacao.findAll();
    const csv = new Parser().parse(transacoes);

    res.header('Content-Type', 'text/csv');
    res.attachment('transacoes.csv');
    return res.send(csv);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.reports = async (req, res) => {
  try {
    // Exemplo de relatório de transações
    const transacoes = await Transacao.findAll();

    const csv = new Parser().parse(transacoes);

    res.header('Content-Type', 'text/csv');
    res.attachment('relatorio_transacoes.csv');
    return res.send(csv);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
