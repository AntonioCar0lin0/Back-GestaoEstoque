-- Script SQL ULTRA MINIMAL para popular o banco
-- Versão super reduzida para API ML processar rapidamente

-- =============================================
-- INSERÇÃO DE CATEGORIAS (2 categorias apenas)
-- =============================================
INSERT INTO categorias (nome, description, color, "createdAt", "updatedAt") VALUES
('Eletrônicos', 'Produtos eletrônicos', '#3B82F6', NOW(), NOW()),
('Roupas', 'Vestuário e acessórios', '#EF4444', NOW(), NOW());

-- =============================================
-- INSERÇÃO DE PRODUTOS (6 produtos apenas)
-- =============================================
INSERT INTO produtos (nome, categoria, quantidade_estoque, preco_compra, preco_venda, "createdAt", "updatedAt") VALUES
-- Eletrônicos (3 produtos)
('Smartphone Samsung', 'Eletrônicos', 10, 1200.00, 1800.00, NOW(), NOW()),
('Fone Bluetooth', 'Eletrônicos', 15, 80.00, 150.00, NOW(), NOW()),
('Carregador Portátil', 'Eletrônicos', 20, 45.00, 89.90, NOW(), NOW()),

-- Roupas (3 produtos)
('Camiseta Básica', 'Roupas', 25, 25.00, 49.90, NOW(), NOW()),
('Calça Jeans', 'Roupas', 12, 60.00, 120.00, NOW(), NOW()),
('Tênis Esportivo', 'Roupas', 8, 180.00, 299.90, NOW(), NOW());

-- =============================================
-- INSERÇÃO DE TRANSAÇÕES (8 transações apenas)
-- =============================================
INSERT INTO transacoes (tipo, valor, descricao, categoria, data, "createdAt", "updatedAt") VALUES
-- Receitas recentes (4 receitas)
('receita', 1800.00, 'Venda de Smartphone Samsung', 'Eletrônicos', '2025-08-07', NOW(), NOW()),
('receita', 150.00, 'Venda de Fone Bluetooth', 'Eletrônicos', '2025-08-06', NOW(), NOW()),
('receita', 299.90, 'Venda de Tênis Esportivo', 'Roupas', '2025-08-05', NOW(), NOW()),
('receita', 49.90, 'Venda de Camiseta', 'Roupas', '2025-08-04', NOW(), NOW()),

-- Despesas básicas (4 despesas)
('despesa', 1000.00, 'Reposição de estoque', 'Estoque', '2025-08-01', NOW(), NOW()),
('despesa', 500.00, 'Aluguel', 'Operacional', '2025-08-01', NOW(), NOW()),
('despesa', 200.00, 'Energia', 'Operacional', '2025-08-02', NOW(), NOW()),
('despesa', 100.00, 'Internet', 'Operacional', '2025-08-03', NOW(), NOW());

-- =============================================
-- VERIFICAR DADOS INSERIDOS
-- =============================================
SELECT 'Categorias:' as info, COUNT(*) as total FROM categorias
UNION ALL
SELECT 'Produtos:', COUNT(*) FROM produtos
UNION ALL
SELECT 'Transações:', COUNT(*) FROM transacoes;

-- =============================================
-- SCRIPT ULTRA MINIMAL CONCLUÍDO!
-- =============================================
-- ✅ 2 categorias
-- ✅ 6 produtos  
-- ✅ 8 transações
-- ⚡ Dados mínimos para teste rápido da API ML
-- =============================================
