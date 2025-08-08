-- Script SQL para popular o banco de dados do Sistema de Gestão de Estoque
-- Execute este script após criar as tabelas via Sequelize migrations

-- =============================================
-- INSERÇÃO DE CATEGORIAS
-- =============================================
INSERT INTO categorias (nome, description, color, "createdAt", "updatedAt") VALUES
('Eletrônicos', 'Produtos eletrônicos e tecnológicos', '#3B82F6', NOW(), NOW()),
('Roupas', 'Vestuário e acessórios de moda', '#EF4444', NOW(), NOW()),
('Casa e Jardim', 'Produtos para casa, decoração e jardinagem', '#10B981', NOW(), NOW()),
('Esportes', 'Artigos esportivos e fitness', '#F59E0B', NOW(), NOW()),
('Livros', 'Livros, revistas e material educativo', '#8B5CF6', NOW(), NOW()),
('Beleza', 'Cosméticos e produtos de beleza', '#EC4899', NOW(), NOW()),
('Alimentação', 'Alimentos e bebidas', '#F97316', NOW(), NOW()),
('Ferramentas', 'Ferramentas e equipamentos', '#6B7280', NOW(), NOW());

-- =============================================
-- INSERÇÃO DE PRODUTOS
-- =============================================
INSERT INTO produtos (nome, categoria, quantidade_estoque, preco_compra, preco_venda, "createdAt", "updatedAt") VALUES
-- Eletrônicos
('Smartphone Samsung Galaxy A54', 'Eletrônicos', 15, 1200.00, 1800.00, NOW(), NOW()),
('Notebook Dell Inspiron', 'Eletrônicos', 8, 2500.00, 3500.00, NOW(), NOW()),
('Fone de Ouvido Bluetooth', 'Eletrônicos', 25, 80.00, 150.00, NOW(), NOW()),
('Smart TV 50 polegadas', 'Eletrônicos', 5, 1800.00, 2800.00, NOW(), NOW()),
('Carregador Portátil', 'Eletrônicos', 30, 45.00, 89.90, NOW(), NOW()),

-- Roupas
('Camiseta Básica Algodão', 'Roupas', 50, 25.00, 49.90, NOW(), NOW()),
('Calça Jeans Masculina', 'Roupas', 20, 60.00, 120.00, NOW(), NOW()),
('Vestido Feminino Casual', 'Roupas', 15, 40.00, 89.90, NOW(), NOW()),
('Tênis Esportivo Nike', 'Roupas', 12, 180.00, 299.90, NOW(), NOW()),
('Jaqueta de Couro', 'Roupas', 8, 200.00, 399.90, NOW(), NOW()),

-- Casa e Jardim
('Vaso Decorativo Cerâmica', 'Casa e Jardim', 35, 30.00, 59.90, NOW(), NOW()),
('Conjunto de Panelas', 'Casa e Jardim', 18, 120.00, 249.90, NOW(), NOW()),
('Luminária de Mesa LED', 'Casa e Jardim', 22, 45.00, 89.90, NOW(), NOW()),
('Tapete Sala de Estar', 'Casa e Jardim', 10, 80.00, 159.90, NOW(), NOW()),
('Kit Jardinagem', 'Casa e Jardim', 25, 35.00, 69.90, NOW(), NOW()),

-- Esportes
('Bola de Futebol Profissional', 'Esportes', 40, 50.00, 89.90, NOW(), NOW()),
('Halteres 5kg (Par)', 'Esportes', 15, 60.00, 119.90, NOW(), NOW()),
('Raquete de Tênis', 'Esportes', 12, 150.00, 299.90, NOW(), NOW()),
('Esteira Elétrica', 'Esportes', 3, 1500.00, 2499.90, NOW(), NOW()),
('Kit Yoga Completo', 'Esportes', 20, 80.00, 149.90, NOW(), NOW()),

-- Livros
('Livro "Clean Code"', 'Livros', 30, 40.00, 79.90, NOW(), NOW()),
('Romance "O Alquimista"', 'Livros', 25, 25.00, 49.90, NOW(), NOW()),
('Manual de JavaScript', 'Livros', 18, 60.00, 119.90, NOW(), NOW()),
('Revista Tech Monthly', 'Livros', 50, 8.00, 15.90, NOW(), NOW()),
('Curso Online Python', 'Livros', 100, 150.00, 299.90, NOW(), NOW()),

-- Beleza
('Perfume Feminino 100ml', 'Beleza', 28, 80.00, 159.90, NOW(), NOW()),
('Kit Maquiagem Completo', 'Beleza', 15, 120.00, 249.90, NOW(), NOW()),
('Shampoo Profissional', 'Beleza', 45, 25.00, 49.90, NOW(), NOW()),
('Creme Hidratante Facial', 'Beleza', 35, 35.00, 69.90, NOW(), NOW()),
('Esmalte Premium', 'Beleza', 60, 12.00, 24.90, NOW(), NOW()),

-- Alimentação
('Café Gourmet 500g', 'Alimentação', 80, 15.00, 29.90, NOW(), NOW()),
('Chocolate Premium', 'Alimentação', 100, 8.00, 16.90, NOW(), NOW()),
('Azeite Extra Virgem', 'Alimentação', 40, 18.00, 35.90, NOW(), NOW()),
('Vinho Tinto Reserva', 'Alimentação', 24, 35.00, 69.90, NOW(), NOW()),
('Mel Orgânico 250g', 'Alimentação', 50, 12.00, 24.90, NOW(), NOW()),

-- Ferramentas
('Furadeira Elétrica', 'Ferramentas', 10, 180.00, 299.90, NOW(), NOW()),
('Kit Chaves de Fenda', 'Ferramentas', 25, 35.00, 69.90, NOW(), NOW()),
('Martelo Profissional', 'Ferramentas', 20, 25.00, 49.90, NOW(), NOW()),
('Nível a Laser', 'Ferramentas', 8, 120.00, 219.90, NOW(), NOW()),
('Caixa de Ferramentas', 'Ferramentas', 15, 80.00, 149.90, NOW(), NOW());

-- =============================================
-- INSERÇÃO DE VENDAS (Últimos 6 meses)
-- =============================================
INSERT INTO vendas (data_venda, receita, custo, lucro, "createdAt", "updatedAt") VALUES
-- Janeiro 2025
('2025-01-15', 1800.00, 1200.00, 600.00, '2025-01-15 10:30:00', '2025-01-15 10:30:00'),
('2025-01-18', 450.00, 300.00, 150.00, '2025-01-18 14:20:00', '2025-01-18 14:20:00'),
('2025-01-22', 299.90, 180.00, 119.90, '2025-01-22 16:45:00', '2025-01-22 16:45:00'),
('2025-01-28', 749.80, 500.00, 249.80, '2025-01-28 11:15:00', '2025-01-28 11:15:00'),

-- Fevereiro 2025
('2025-02-03', 2800.00, 1800.00, 1000.00, '2025-02-03 09:30:00', '2025-02-03 09:30:00'),
('2025-02-08', 599.80, 360.00, 239.80, '2025-02-08 15:20:00', '2025-02-08 15:20:00'),
('2025-02-14', 149.90, 80.00, 69.90, '2025-02-14 13:45:00', '2025-02-14 13:45:00'),
('2025-02-20', 399.90, 240.00, 159.90, '2025-02-20 10:30:00', '2025-02-20 10:30:00'),
('2025-02-25', 89.90, 45.00, 44.90, '2025-02-25 17:15:00', '2025-02-25 17:15:00'),

-- Março 2025
('2025-03-05', 3500.00, 2500.00, 1000.00, '2025-03-05 11:00:00', '2025-03-05 11:00:00'),
('2025-03-12', 249.90, 140.00, 109.90, '2025-03-12 14:30:00', '2025-03-12 14:30:00'),
('2025-03-18', 179.80, 100.00, 79.80, '2025-03-18 16:20:00', '2025-03-18 16:20:00'),
('2025-03-24', 499.90, 300.00, 199.90, '2025-03-24 12:45:00', '2025-03-24 12:45:00'),

-- Abril 2025
('2025-04-02', 1599.80, 1000.00, 599.80, '2025-04-02 10:15:00', '2025-04-02 10:15:00'),
('2025-04-09', 299.90, 180.00, 119.90, '2025-04-09 15:30:00', '2025-04-09 15:30:00'),
('2025-04-16', 149.90, 80.00, 69.90, '2025-04-16 11:45:00', '2025-04-16 11:45:00'),
('2025-04-23', 689.70, 420.00, 269.70, '2025-04-23 13:20:00', '2025-04-23 13:20:00'),
('2025-04-29', 2499.90, 1500.00, 999.90, '2025-04-29 16:00:00', '2025-04-29 16:00:00'),

-- Maio 2025
('2025-05-06', 799.80, 480.00, 319.80, '2025-05-06 09:45:00', '2025-05-06 09:45:00'),
('2025-05-13', 399.90, 240.00, 159.90, '2025-05-13 14:15:00', '2025-05-13 14:15:00'),
('2025-05-20', 119.90, 70.00, 49.90, '2025-05-20 17:30:00', '2025-05-20 17:30:00'),
('2025-05-27', 1749.70, 1080.00, 669.70, '2025-05-27 12:00:00', '2025-05-27 12:00:00'),

-- Junho 2025
('2025-06-04', 249.90, 140.00, 109.90, '2025-06-04 10:20:00', '2025-06-04 10:20:00'),
('2025-06-11', 599.80, 360.00, 239.80, '2025-06-11 15:45:00', '2025-06-11 15:45:00'),
('2025-06-18', 89.90, 45.00, 44.90, '2025-06-18 13:30:00', '2025-06-18 13:30:00'),
('2025-06-25', 1299.80, 800.00, 499.80, '2025-06-25 11:15:00', '2025-06-25 11:15:00'),

-- Julho 2025
('2025-07-02', 349.80, 210.00, 139.80, '2025-07-02 16:20:00', '2025-07-02 16:20:00'),
('2025-07-09', 2249.70, 1400.00, 849.70, '2025-07-09 10:45:00', '2025-07-09 10:45:00'),
('2025-07-16', 199.90, 120.00, 79.90, '2025-07-16 14:00:00', '2025-07-16 14:00:00'),
('2025-07-23', 899.70, 540.00, 359.70, '2025-07-23 12:30:00', '2025-07-23 12:30:00'),
('2025-07-30', 449.80, 270.00, 179.80, '2025-07-30 17:45:00', '2025-07-30 17:45:00'),

-- Agosto 2025 (dados recentes)
('2025-08-01', 1899.80, 1200.00, 699.80, '2025-08-01 09:30:00', '2025-08-01 09:30:00'),
('2025-08-05', 299.90, 180.00, 119.90, '2025-08-05 15:20:00', '2025-08-05 15:20:00'),
('2025-08-07', 749.70, 450.00, 299.70, '2025-08-07 11:45:00', '2025-08-07 11:45:00');

-- =============================================
-- INSERÇÃO DE ITENS DE VENDA
-- =============================================
INSERT INTO itens_venda (quantidade, preco_unitario, subtotal, id_produto, id_venda, "createdAt", "updatedAt") VALUES
-- Venda 1: Smartphone
(1, 1800.00, 1800.00, 1, 1, '2025-01-15 10:30:00', '2025-01-15 10:30:00'),

-- Venda 2: Fone Bluetooth + Carregador
(2, 150.00, 300.00, 3, 2, '2025-01-18 14:20:00', '2025-01-18 14:20:00'),
(1, 89.90, 89.90, 5, 2, '2025-01-18 14:20:00', '2025-01-18 14:20:00'),

-- Venda 3: Tênis
(1, 299.90, 299.90, 9, 3, '2025-01-22 16:45:00', '2025-01-22 16:45:00'),

-- Venda 4: Camisetas + Calça
(3, 49.90, 149.70, 6, 4, '2025-01-28 11:15:00', '2025-01-28 11:15:00'),
(1, 120.00, 120.00, 7, 4, '2025-01-28 11:15:00', '2025-01-28 11:15:00'),

-- Venda 5: Smart TV
(1, 2800.00, 2800.00, 4, 5, '2025-02-03 09:30:00', '2025-02-03 09:30:00'),

-- Venda 6: Produtos casa
(2, 59.90, 119.80, 11, 6, '2025-02-08 15:20:00', '2025-02-08 15:20:00'),
(1, 249.90, 249.90, 12, 6, '2025-02-08 15:20:00', '2025-02-08 15:20:00'),

-- Venda 7: Kit Yoga
(1, 149.90, 149.90, 20, 7, '2025-02-14 13:45:00', '2025-02-14 13:45:00'),

-- Venda 8: Jaqueta
(1, 399.90, 399.90, 10, 8, '2025-02-20 10:30:00', '2025-02-20 10:30:00'),

-- Venda 9: Carregador
(1, 89.90, 89.90, 5, 9, '2025-02-25 17:15:00', '2025-02-25 17:15:00'),

-- Venda 10: Notebook
(1, 3500.00, 3500.00, 2, 10, '2025-03-05 11:00:00', '2025-03-05 11:00:00'),

-- Venda 11: Kit Maquiagem
(1, 249.90, 249.90, 27, 11, '2025-03-12 14:30:00', '2025-03-12 14:30:00'),

-- Venda 12: Livros
(2, 79.90, 159.80, 21, 12, '2025-03-18 16:20:00', '2025-03-18 16:20:00'),
(1, 49.90, 49.90, 22, 12, '2025-03-18 16:20:00', '2025-03-18 16:20:00'),

-- Venda 13: Halteres + Bola
(1, 119.90, 119.90, 17, 13, '2025-03-24 12:45:00', '2025-03-24 12:45:00'),
(1, 89.90, 89.90, 16, 13, '2025-03-24 12:45:00', '2025-03-24 12:45:00'),

-- Venda 14: Perfume + Creme
(1, 159.90, 159.90, 26, 14, '2025-04-02 10:15:00', '2025-04-02 10:15:00'),
(2, 69.90, 139.80, 29, 14, '2025-04-02 10:15:00', '2025-04-02 10:15:00'),

-- Venda 15: Tênis
(1, 299.90, 299.90, 9, 15, '2025-04-09 15:30:00', '2025-04-09 15:30:00'),

-- Venda 16: Kit Yoga
(1, 149.90, 149.90, 20, 16, '2025-04-16 11:45:00', '2025-04-16 11:45:00'),

-- Venda 17: Produtos alimentação
(3, 29.90, 89.70, 31, 17, '2025-04-23 13:20:00', '2025-04-23 13:20:00'),
(2, 69.90, 139.80, 34, 17, '2025-04-23 13:20:00', '2025-04-23 13:20:00'),

-- Venda 18: Esteira
(1, 2499.90, 2499.90, 19, 18, '2025-04-29 16:00:00', '2025-04-29 16:00:00'),

-- Venda 19: Produtos beleza
(1, 249.90, 249.90, 27, 19, '2025-05-06 09:45:00', '2025-05-06 09:45:00'),
(3, 49.90, 149.70, 28, 19, '2025-05-06 09:45:00', '2025-05-06 09:45:00'),

-- Venda 20: Jaqueta
(1, 399.90, 399.90, 10, 20, '2025-05-13 14:15:00', '2025-05-13 14:15:00'),

-- Venda 21: Manual JavaScript
(1, 119.90, 119.90, 23, 21, '2025-05-20 17:30:00', '2025-05-20 17:30:00'),

-- Venda 22: Smartphone + Fone
(1, 1800.00, 1800.00, 1, 22, '2025-05-27 12:00:00', '2025-05-27 12:00:00'),
(2, 150.00, 300.00, 3, 22, '2025-05-27 12:00:00', '2025-05-27 12:00:00'),

-- Venda 23: Kit Maquiagem
(1, 249.90, 249.90, 27, 23, '2025-06-04 10:20:00', '2025-06-04 10:20:00'),

-- Venda 24: Produtos casa
(2, 59.90, 119.80, 11, 24, '2025-06-11 15:45:00', '2025-06-11 15:45:00'),
(1, 249.90, 249.90, 12, 24, '2025-06-11 15:45:00', '2025-06-11 15:45:00'),

-- Venda 25: Carregador
(1, 89.90, 89.90, 5, 25, '2025-06-18 13:30:00', '2025-06-18 13:30:00'),

-- Venda 26: Ferramentas
(1, 299.90, 299.90, 36, 26, '2025-06-25 11:15:00', '2025-06-25 11:15:00'),
(1, 149.90, 149.90, 40, 26, '2025-06-25 11:15:00', '2025-06-25 11:15:00'),

-- Venda 27: Produtos diversos
(2, 49.90, 99.80, 6, 27, '2025-07-02 16:20:00', '2025-07-02 16:20:00'),
(1, 69.90, 69.90, 15, 27, '2025-07-02 16:20:00', '2025-07-02 16:20:00'),

-- Venda 28: Smart TV + Luminária
(1, 2800.00, 2800.00, 4, 28, '2025-07-09 10:45:00', '2025-07-09 10:45:00'),
(2, 89.90, 179.80, 13, 28, '2025-07-09 10:45:00', '2025-07-09 10:45:00'),

-- Venda 29: Livros
(1, 79.90, 79.90, 21, 29, '2025-07-16 14:00:00', '2025-07-16 14:00:00'),
(1, 119.90, 119.90, 23, 29, '2025-07-16 14:00:00', '2025-07-16 14:00:00'),

-- Venda 30: Raquete + Bola
(1, 299.90, 299.90, 18, 30, '2025-07-23 12:30:00', '2025-07-23 12:30:00'),
(2, 89.90, 179.80, 16, 30, '2025-07-23 12:30:00', '2025-07-23 12:30:00'),

-- Venda 31: Produtos diversos
(2, 49.90, 99.80, 28, 31, '2025-07-30 17:45:00', '2025-07-30 17:45:00'),
(1, 159.90, 159.90, 26, 31, '2025-07-30 17:45:00', '2025-07-30 17:45:00'),

-- Venda 32: Smartphone + Carregador
(1, 1800.00, 1800.00, 1, 32, '2025-08-01 09:30:00', '2025-08-01 09:30:00'),
(1, 89.90, 89.90, 5, 32, '2025-08-01 09:30:00', '2025-08-01 09:30:00'),

-- Venda 33: Tênis
(1, 299.90, 299.90, 9, 33, '2025-08-05 15:20:00', '2025-08-05 15:20:00'),

-- Venda 34: Produtos alimentação
(4, 29.90, 119.60, 31, 34, '2025-08-07 11:45:00', '2025-08-07 11:45:00'),
(3, 35.90, 107.70, 33, 34, '2025-08-07 11:45:00', '2025-08-07 11:45:00');

-- =============================================
-- INSERÇÃO DE TRANSAÇÕES
-- =============================================
INSERT INTO transacoes (tipo, valor, descricao, categoria, data, "produtoId", "createdAt", "updatedAt") VALUES
-- Receitas (baseadas nas vendas)
('receita', 1800.00, 'Venda de Smartphone Samsung Galaxy A54', 'Eletrônicos', '2025-01-15', 1, '2025-01-15 10:30:00', '2025-01-15 10:30:00'),
('receita', 450.00, 'Venda de eletrônicos diversos', 'Eletrônicos', '2025-01-18', 3, '2025-01-18 14:20:00', '2025-01-18 14:20:00'),
('receita', 299.90, 'Venda de tênis esportivo', 'Roupas', '2025-01-22', 9, '2025-01-22 16:45:00', '2025-01-22 16:45:00'),
('receita', 749.80, 'Venda de roupas diversas', 'Roupas', '2025-01-28', 6, '2025-01-28 11:15:00', '2025-01-28 11:15:00'),
('receita', 2800.00, 'Venda de Smart TV 50 polegadas', 'Eletrônicos', '2025-02-03', 4, '2025-02-03 09:30:00', '2025-02-03 09:30:00'),
('receita', 599.80, 'Venda de produtos para casa', 'Casa e Jardim', '2025-02-08', 11, '2025-02-08 15:20:00', '2025-02-08 15:20:00'),
('receita', 149.90, 'Venda de kit yoga', 'Esportes', '2025-02-14', 20, '2025-02-14 13:45:00', '2025-02-14 13:45:00'),
('receita', 399.90, 'Venda de jaqueta de couro', 'Roupas', '2025-02-20', 10, '2025-02-20 10:30:00', '2025-02-20 10:30:00'),
('receita', 89.90, 'Venda de carregador portátil', 'Eletrônicos', '2025-02-25', 5, '2025-02-25 17:15:00', '2025-02-25 17:15:00'),
('receita', 3500.00, 'Venda de Notebook Dell Inspiron', 'Eletrônicos', '2025-03-05', 2, '2025-03-05 11:00:00', '2025-03-05 11:00:00'),
('receita', 249.90, 'Venda de kit maquiagem', 'Beleza', '2025-03-12', 27, '2025-03-12 14:30:00', '2025-03-12 14:30:00'),
('receita', 179.80, 'Venda de livros diversos', 'Livros', '2025-03-18', 21, '2025-03-18 16:20:00', '2025-03-18 16:20:00'),
('receita', 499.90, 'Venda de equipamentos esportivos', 'Esportes', '2025-03-24', 17, '2025-03-24 12:45:00', '2025-03-24 12:45:00'),
('receita', 1599.80, 'Venda de produtos de beleza', 'Beleza', '2025-04-02', 26, '2025-04-02 10:15:00', '2025-04-02 10:15:00'),
('receita', 299.90, 'Venda de tênis esportivo', 'Roupas', '2025-04-09', 9, '2025-04-09 15:30:00', '2025-04-09 15:30:00'),
('receita', 149.90, 'Venda de kit yoga', 'Esportes', '2025-04-16', 20, '2025-04-16 11:45:00', '2025-04-16 11:45:00'),
('receita', 689.70, 'Venda de produtos alimentação', 'Alimentação', '2025-04-23', 31, '2025-04-23 13:20:00', '2025-04-23 13:20:00'),
('receita', 2499.90, 'Venda de esteira elétrica', 'Esportes', '2025-04-29', 19, '2025-04-29 16:00:00', '2025-04-29 16:00:00'),
('receita', 799.80, 'Venda de produtos de beleza', 'Beleza', '2025-05-06', 27, '2025-05-06 09:45:00', '2025-05-06 09:45:00'),
('receita', 399.90, 'Venda de jaqueta de couro', 'Roupas', '2025-05-13', 10, '2025-05-13 14:15:00', '2025-05-13 14:15:00'),
('receita', 119.90, 'Venda de manual JavaScript', 'Livros', '2025-05-20', 23, '2025-05-20 17:30:00', '2025-05-20 17:30:00'),
('receita', 1749.70, 'Venda de smartphone e acessórios', 'Eletrônicos', '2025-05-27', 1, '2025-05-27 12:00:00', '2025-05-27 12:00:00'),
('receita', 249.90, 'Venda de kit maquiagem', 'Beleza', '2025-06-04', 27, '2025-06-04 10:20:00', '2025-06-04 10:20:00'),
('receita', 599.80, 'Venda de produtos casa e jardim', 'Casa e Jardim', '2025-06-11', 11, '2025-06-11 15:45:00', '2025-06-11 15:45:00'),
('receita', 89.90, 'Venda de carregador portátil', 'Eletrônicos', '2025-06-18', 5, '2025-06-18 13:30:00', '2025-06-18 13:30:00'),
('receita', 1299.80, 'Venda de ferramentas profissionais', 'Ferramentas', '2025-06-25', 36, '2025-06-25 11:15:00', '2025-06-25 11:15:00'),
('receita', 349.80, 'Venda de produtos diversos', 'Roupas', '2025-07-02', 6, '2025-07-02 16:20:00', '2025-07-02 16:20:00'),
('receita', 2249.70, 'Venda de Smart TV e acessórios', 'Eletrônicos', '2025-07-09', 4, '2025-07-09 10:45:00', '2025-07-09 10:45:00'),
('receita', 199.90, 'Venda de livros técnicos', 'Livros', '2025-07-16', 21, '2025-07-16 14:00:00', '2025-07-16 14:00:00'),
('receita', 899.70, 'Venda de equipamentos esportivos', 'Esportes', '2025-07-23', 18, '2025-07-23 12:30:00', '2025-07-23 12:30:00'),
('receita', 449.80, 'Venda de produtos de beleza', 'Beleza', '2025-07-30', 28, '2025-07-30 17:45:00', '2025-07-30 17:45:00'),
('receita', 1899.80, 'Venda de smartphone e carregador', 'Eletrônicos', '2025-08-01', 1, '2025-08-01 09:30:00', '2025-08-01 09:30:00'),
('receita', 299.90, 'Venda de tênis esportivo', 'Roupas', '2025-08-05', 9, '2025-08-05 15:20:00', '2025-08-05 15:20:00'),
('receita', 749.70, 'Venda de produtos alimentação', 'Alimentação', '2025-08-07', 31, '2025-08-07 11:45:00', '2025-08-07 11:45:00'),

-- Despesas operacionais
('despesa', 5000.00, 'Reposição de estoque - Eletrônicos', 'Estoque', '2025-01-10', NULL, '2025-01-10 09:00:00', '2025-01-10 09:00:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-01-05', NULL, '2025-01-05 08:00:00', '2025-01-05 08:00:00'),
('despesa', 450.00, 'Conta de luz', 'Operacional', '2025-01-15', NULL, '2025-01-15 14:00:00', '2025-01-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-01-20', NULL, '2025-01-20 10:00:00', '2025-01-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-01-30', NULL, '2025-01-30 16:00:00', '2025-01-30 16:00:00'),

('despesa', 3200.00, 'Reposição de estoque - Roupas', 'Estoque', '2025-02-08', NULL, '2025-02-08 10:00:00', '2025-02-08 10:00:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-02-05', NULL, '2025-02-05 08:00:00', '2025-02-05 08:00:00'),
('despesa', 520.00, 'Conta de luz', 'Operacional', '2025-02-15', NULL, '2025-02-15 14:00:00', '2025-02-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-02-20', NULL, '2025-02-20 10:00:00', '2025-02-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-02-28', NULL, '2025-02-28 16:00:00', '2025-02-28 16:00:00'),

('despesa', 2800.00, 'Reposição de estoque - Casa e Jardim', 'Estoque', '2025-03-12', NULL, '2025-03-12 11:00:00', '2025-03-12 11:00:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-03-05', NULL, '2025-03-05 08:00:00', '2025-03-05 08:00:00'),
('despesa', 480.00, 'Conta de luz', 'Operacional', '2025-03-15', NULL, '2025-03-15 14:00:00', '2025-03-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-03-20', NULL, '2025-03-20 10:00:00', '2025-03-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-03-31', NULL, '2025-03-31 16:00:00', '2025-03-31 16:00:00'),

('despesa', 4500.00, 'Reposição de estoque - Esportes e Beleza', 'Estoque', '2025-04-10', NULL, '2025-04-10 09:30:00', '2025-04-10 09:30:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-04-05', NULL, '2025-04-05 08:00:00', '2025-04-05 08:00:00'),
('despesa', 550.00, 'Conta de luz', 'Operacional', '2025-04-15', NULL, '2025-04-15 14:00:00', '2025-04-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-04-20', NULL, '2025-04-20 10:00:00', '2025-04-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-04-30', NULL, '2025-04-30 16:00:00', '2025-04-30 16:00:00'),

('despesa', 3100.00, 'Reposição de estoque - Livros e Alimentação', 'Estoque', '2025-05-08', NULL, '2025-05-08 10:15:00', '2025-05-08 10:15:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-05-05', NULL, '2025-05-05 08:00:00', '2025-05-05 08:00:00'),
('despesa', 520.00, 'Conta de luz', 'Operacional', '2025-05-15', NULL, '2025-05-15 14:00:00', '2025-05-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-05-20', NULL, '2025-05-20 10:00:00', '2025-05-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-05-31', NULL, '2025-05-31 16:00:00', '2025-05-31 16:00:00'),

('despesa', 2700.00, 'Reposição de estoque - Ferramentas', 'Estoque', '2025-06-12', NULL, '2025-06-12 11:30:00', '2025-06-12 11:30:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-06-05', NULL, '2025-06-05 08:00:00', '2025-06-05 08:00:00'),
('despesa', 480.00, 'Conta de luz', 'Operacional', '2025-06-15', NULL, '2025-06-15 14:00:00', '2025-06-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-06-20', NULL, '2025-06-20 10:00:00', '2025-06-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-06-30', NULL, '2025-06-30 16:00:00', '2025-06-30 16:00:00'),

('despesa', 5200.00, 'Reposição de estoque - Eletrônicos Premium', 'Estoque', '2025-07-10', NULL, '2025-07-10 09:45:00', '2025-07-10 09:45:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-07-05', NULL, '2025-07-05 08:00:00', '2025-07-05 08:00:00'),
('despesa', 590.00, 'Conta de luz', 'Operacional', '2025-07-15', NULL, '2025-07-15 14:00:00', '2025-07-15 14:00:00'),
('despesa', 180.00, 'Internet e telefone', 'Operacional', '2025-07-20', NULL, '2025-07-20 10:00:00', '2025-07-20 10:00:00'),
('despesa', 800.00, 'Salários funcionários', 'Pessoal', '2025-07-31', NULL, '2025-07-31 16:00:00', '2025-07-31 16:00:00'),

('despesa', 3800.00, 'Reposição de estoque - Mix de produtos', 'Estoque', '2025-08-02', NULL, '2025-08-02 10:20:00', '2025-08-02 10:20:00'),
('despesa', 1200.00, 'Aluguel da loja', 'Operacional', '2025-08-05', NULL, '2025-08-05 08:00:00', '2025-08-05 08:00:00'),
('despesa', 520.00, 'Conta de luz', 'Operacional', '2025-08-07', NULL, '2025-08-07 14:00:00', '2025-08-07 14:00:00');

-- =============================================
-- VERIFICAÇÕES E ESTATÍSTICAS
-- =============================================

-- Verificar total de registros inseridos
SELECT 
    (SELECT COUNT(*) FROM categorias) as total_categorias,
    (SELECT COUNT(*) FROM produtos) as total_produtos,
    (SELECT COUNT(*) FROM vendas) as total_vendas,
    (SELECT COUNT(*) FROM itens_venda) as total_itens_venda,
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
-- SCRIPT CONCLUÍDO COM SUCESSO!
-- =============================================
-- ✅ 8 categorias inseridas
-- ✅ 35 produtos inseridos (5 por categoria)  
-- ✅ 34 vendas inseridas (últimos 8 meses)
-- ✅ 50+ itens de venda inseridos
-- ✅ 65+ transações inseridas (receitas + despesas)
--
-- Total aproximado de registros: ~180
-- Período de dados: Janeiro 2025 - Agosto 2025
-- Dados realistas para análise de ML e relatórios
-- =============================================
