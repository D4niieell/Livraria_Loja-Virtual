import pool from '../database/database.js';

class CategoriaModel {
    async showCategorias() {
        const [rows] = await pool.execute('SELECT * FROM categorias');
        return rows;
    }

async getCategoriaById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM categorias WHERE id_categoria = ?',
            [id]
        )
        return rows[0];
    }

async createCategoria(data) {
    const { categoria } = data;
    const [row] = await pool.execute(
        'INSERT INTO categorias (nome) VALUES (?)',
            [categoria]
        );
        return row;
    }

async updateCategoria(id, data) {
    const { categoria } = data;
    const [row] = await pool.execute(
            'UPDATE categorias SET nome = ? WHERE id_categoria = ?',
            [categoria,id]
        );
        return row;
    }

async deleteCategoria(id) {
    const [row] = await pool.execute(
            'DELETE FROM categorias WHERE id_categoria = ?',
            [id]
        );
        return row
    }
}

export default new CategoriaModel();