import pool from '../database/database.js';
// =============================================================================
class ComprasModel {
    async showCompras() {
        const [rows] = await pool.execute(
            `
            SELECT 
                compras.qtde,
                compras.data_compra,
                clientes.nome AS cliente,
                livros.titulo AS livro,
                livros.preco
            FROM compras
            JOIN clientes ON compras.id_cliente = clientes.id_cliente
            JOIN livros ON compras.id_livro = livros.id_livro
            `
        );
        return rows;
    }
// =============================================================================
    async getComprasById(id) {
        const [rows] = await pool.execute(
            `
            SELECT 
                compras.qtde,
                compras.data_compra,
                clientes.nome AS cliente,
                livros.titulo AS livro,
                livros.preco
            FROM compras
            JOIN clientes ON compras.id_cliente = clientes.id_cliente
            JOIN livros ON compras.id_livro = livros.id_livro
            WHERE compras.id_compra = ?
            `, [id]
        );
        return rows;
    }
// =============================================================================
    async createCompras(data) {
        const { qtde, valor, desconto, id_livro, id_cliente } = data;
        const [row] = await pool.execute(
            'INSERT INTO compras (qtde, valor, desconto, id_livro, id_cliente) VALUES (?, ?, ?, ?, ?)',
            [qtde, valor, desconto, id_livro, id_cliente]
        );
        return row;
    }
// =============================================================================
    async updateCompras(id, data) {
        const { qtde, valor, desconto, id_livro, id_cliente } = data;
        const [row] = await pool.execute(
            'UPDATE compras SET qtde = ?, valor = ?, desconto = ?, id_livro = ?, id_cliente = ? WHERE id_compra = ?',
            [qtde, valor, desconto, id_livro, id_cliente, id]
        );
        return row;
    }
// =============================================================================
    async deleteCompras(id) {
        const [row] = await pool.execute(
            'DELETE FROM compras WHERE id_compra = ?',
            [id]
        );
        return row;
    }
}
// =============================================================================
export default new ComprasModel();