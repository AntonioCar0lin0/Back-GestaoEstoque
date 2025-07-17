exports.summary = async (req, res) => {
  try {
    // Alterar posteriormente
    const totalVendas = await Venda.sum('valor');
    const totalProdutos = await Produto.count();
    const totalTransacoes = await Transacao.count();

    return res.json({
      totalVendas,
      totalProdutos,
      totalTransacoes,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
