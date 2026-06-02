import pool from '../database/database.js';

class ComprasModel {
    async showCompras() {
        const [rows] = await pool.execute(
            `
            SELECT 
                compras.quantidade,
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

    async getComprasById(id) {
        const [rows] = await pool.execute(
            `
            SELECT 
                compras.quantidade,
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
        return rows[0];
    }
    
    async createCompras(data) {
        const { id_cliente, id_livro, quantidade, data_compra } = data;
        const [row] = await pool.execute(
            'INSERT INTO compras (id_cliente, id_livro, quantidade, data_compra) VALUES (?, ?, ?, ?)',
            [id_cliente, id_livro, quantidade, data_compra]
        );
        return row;
    }

    async updateCompras(id, data) {
        const { id_cliente, id_livro, quantidade, data_compra } = data;
        const [row] = await pool.execute(
            'UPDATE compras SET id_cliente = ?, id_livro = ?, quantidade = ?, data_compra = ? WHERE id_compra = ?',
            [id_cliente, id_livro, quantidade, data_compra, id]
        );
        return row;
    }

    async deleteCompra(id) {
        const [row] = await pool.execute(
            'DELETE FROM compras WHERE id_compra = ?',
            [id]
        );
        return row;
    }
}

export default new ComprasModel();