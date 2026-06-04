import pool from '../database/database.js';
// =============================================================================
class EditoraModel {
    async showEditora() {
        const [rows] = await pool.execute('SELECT * FROM editoras');
        return rows;
    }
// =============================================================================
    async getEditoraById(id) {
        const [rows] = await pool.execute(
            'SELECT * FROM editoras WHERE id_editora = ?',
            [id]
        );
        return rows[0];
    }
// =============================================================================
    async createEditora(data) {
        const {nome, email, telefone} = data;
        const [row] = await pool.execute(
            'INSERT INTO editoras (nome, email, telefone) VALUES (?, ?, ?)',
            [nome, email, telefone]
        );
        return rows; 
    }
// =============================================================================
    async updateEditora(id, data) {
        const {nome, email, telefone} = data;
        const [row] = await pool.execute(
            'UPDATE editoras SET nome = ?, email = ?, telefone = ? WHERE id_editora = ?',
            [nome, email, telefone, id]
        );
        return row;
    }
// =============================================================================
    async deleteEditora(id) {
        const [row] = await pool.execute(
            'DELETE FROM editoras WHERE id_editora = ?',
            [id]
        );
        return row;
    }
}
// =============================================================================
export default new EditoraModel();