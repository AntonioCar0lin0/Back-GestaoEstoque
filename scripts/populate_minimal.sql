-- Script SQL MINIMAL para popular o banco de dados
-- Versão reduzida para melhor performance da API ML
-- Execute este script após criar as tabelas via sync-database.js

-- =============================================
-- INSERÇÃO DE CATEGORIAS (Reduzido: 4 categorias)
-- =============================================
INSERT INTO categorias (nome, description, color, "createdAt", "updatedAt") VALUES
('Eletrônicos', 'Produtos eletrônicos e tecnológicos', '#3B82F6', NOW(), NOW()),
('Roupas', 'Vestuário e acessórios de moda', '#EF4444', NOW(), NOW()),
('Casa e Jardim', 'Produtos para casa e decoração', '#10B981', NOW(), NOW()),
('Esportes', 'Artigos esportivos e fitness', '#F59E0B', NOW(), NOW());

-- =============================================
-- INSERÇÃO DE PRODUTOS (Reduzido: 12 produtos)
-- =============================================
INSERT INTO produtos (nome, categoria, quantidade_estoque, preco_compra, preco_venda, "createdAt", "updatedAt") VALUES
-- Eletrônicos (3 produtos)
('Smartphone Samsung Galaxy A54', 'Eletrônicos', 10, 1200.00, 1800.00, NOW(), NOW()),
('Fone de Ouvido Bluetooth', 'Eletrônicos', 15, 80.00, 150.00, NOW(), NOW()),
('Carregador Portátil', 'Eletrônicos', 20, 45.00, 89.90, NOW(), NOW()),

-- Roupas (3 produtos)
('Camiseta Básica Algodão', 'Roupas', 25, 25.00, 49.90, NOW(), NOW()),
('Calça Jeans Masculina', 'Roupas', 12, 60.00, 120.00, NOW(), NOW()),
('Tênis Esportivo Nike', 'Roupas', 8, 180.00, 299.90, NOW(), NOW()),

-- Casa e Jardim (3 produtos)
('Vaso Decorativo Cerâmica', 'Casa e Jardim', 18, 30.00, 59.90, NOW(), NOW()),
('Conjunto de Panelas', 'Casa e Jardim', 10, 120.00, 249.90, NOW(), NOW()),
('Luminária de Mesa LED', 'Casa e Jardim', 15, 45.00, 89.90, NOW(), NOW()),

-- Esportes (3 produtos)
('Bola de Futebol Profissional', 'Esportes', 20, 50.00, 89.90, NOW(), NOW()),
('Halteres 5kg (Par)', 'Esportes', 8, 60.00, 119.90, NOW(), NOW()),
('Kit Yoga Completo', 'Esportes', 12, 80.00, 149.90, NOW(), NOW());

-- =============================================
-- INSERÇÃO DE TRANSAÇÕES (Reduzido: 20 transações)
-- =============================================
INSERT INTO transacoes (tipo, valor, descricao, categoria, data, "createdAt", "updatedAt") VALUES
-- Receitas recentes (10 receitas)
('receita', 1800.00, 'Venda de Smartphone Samsung Galaxy A54', 'Eletrônicos', '2025-08-01', '2025-08-01 10:30:00', '2025-08-01 10:30:00'),
('receita', 150.00, 'Venda de Fone de Ouvido Bluetooth', 'Eletrônicos', '2025-08-02', '2025-08-02 14:20:00', '2025-08-02 14:20:00'),
('receita', 299.90, 'Venda de Tênis Esportivo Nike', 'Roupas', '2025-08-03', '2025-08-03 16:45:00', '2025-08-03 16:45:00'),
('receita', 169.80, 'Venda de Camisetas (3 unidades)', 'Roupas', '2025-08-04', '2025-08-04 11:15:00', '2025-08-04 11:15:00'),
('receita', 249.90, 'Venda de Conjunto de Panelas', 'Casa e Jardim', '2025-08-05', '2025-08-05 15:20:00', '2025-08-05 15:20:00'),
('receita', 149.90, 'Venda de Kit Yoga Completo', 'Esportes', '2025-08-06', '2025-08-06 13:45:00', '2025-08-06 13:45:00'),
('receita', 89.90, 'Venda de Carregador Portátil', 'Eletrônicos', '2025-08-07', '2025-08-07 17:15:00', '2025-08-07 17:15:00'),
('receita', 120.00, 'Venda de Calça Jeans Masculina', 'Roupas', '2025-08-08', '2025-08-08 12:30:00', '2025-08-08 12:30:00'),
('receita', 89.90, 'Venda de Bola de Futebol', 'Esportes', '2025-07-30', '2025-07-30 10:15:00', '2025-07-30 10:15:00'),
('receita', 179.80, 'Venda de Produtos Casa (Vaso + Luminária)', 'Casa e Jardim', '2025-07-28', '2025-07-28 14:00:00', '2025-07-28 14:00:00'),

-- Despesas operacionais básicas (10 despesas)
('despesa', 2000.00, 'Reposição de estoque - Eletrônicos', 'Estoque', '2025-08-01', '2025-08-01 09:00:00', '2025-08-01 09:00:00'),
('despesa', 800.00, 'Aluguel da loja', 'Operacional', '2025-08-05', '2025-08-05 08:00:00', '2025-08-05 08:00:00'),
('despesa', 250.00, 'Conta de luz', 'Operacional', '2025-08-07', '2025-08-07 14:00:00', '2025-08-07 14:00:00'),
('despesa', 120.00, 'Internet e telefone', 'Operacional', '2025-08-08', '2025-08-08 10:00:00', '2025-08-08 10:00:00'),
('despesa', 600.00, 'Salários funcionários', 'Pessoal', '2025-08-08', '2025-08-08 16:00:00', '2025-08-08 16:00:00'),
('despesa', 1200.00, 'Reposição de estoque - Roupas', 'Estoque', '2025-07-28', '2025-07-28 10:00:00', '2025-07-28 10:00:00'),
('despesa', 800.00, 'Aluguel da loja', 'Operacional', '2025-07-05', '2025-07-05 08:00:00', '2025-07-05 08:00:00'),
('despesa', 280.00, 'Conta de luz', 'Operacional', '2025-07-15', '2025-07-15 14:00:00', '2025-07-15 14:00:00'),
('despesa', 120.00, 'Internet e telefone', 'Operacional', '2025-07-20', '2025-07-20 10:00:00', '2025-07-20 10:00:00'),
('despesa', 600.00, 'Salários funcionários', 'Pessoal', '2025-07-31', '2025-07-31 16:00:00', '2025-07-31 16:00:00');

-- =============================================
-- VERIFICAÇÕES E ESTATÍSTICAS
-- =============================================

-- Verificar total de registros inseridos
SELECT 
    (SELECT COUNT(*) FROM categorias) as total_categorias,
    (SELECT COUNT(*) FROM produtos) as total_produtos,
    (SELECT COUNT(*) FROM transacoes) as total_transacoes;

-- Estatísticas básicas
SELECT 
    'Receita Total' as metrica,
    'R$ ' || ROUND(SUM(valor), 2) as valor
FROM transacoes 
WHERE tipo = 'receita'
UNION ALL
SELECT 
    'Despesa Total' as metrica,
    'R$ ' || ROUND(SUM(valor), 2) as valor
FROM transacoes 
WHERE tipo = 'despesa'
UNION ALL
SELECT 
    'Lucro Líquido' as metrica,
    'R$ ' || ROUND(
        (SELECT SUM(valor) FROM transacoes WHERE tipo = 'receita') - 
        (SELECT SUM(valor) FROM transacoes WHERE tipo = 'despesa'), 
        2
    ) as valor;

-- =============================================
-- SCRIPT MINIMAL CONCLUÍDO COM SUCESSO!
-- =============================================
-- ✅ 4 categorias inseridas
-- ✅ 12 produtos inseridos  
-- ✅ 20 transações inseridas (10 receitas + 10 despesas)
--
-- DADOS REDUZIDOS PARA MELHOR PERFORMANCE ML
-- =============================================
