import pool from "../database/database.js";

class LivroModel {

  async showLivros() {
    const [rows] = await pool.execute(
      `
            SELECT
                livros.titulo,
                livros.autor,
                livros.preco,
                categorias.categoria AS categoria,
                editoras.nome AS editora
            FROM livros
            JOIN categorias ON livros.id_categoria = categorias.id_categoria
            JOIN editoras ON livros.id_editora = editoras.id_editora
            `
    );
    return rows;
  }

  async getLivroById(id) {
    const [rows] = await pool.execute(
      `
            SELECT
                livros.titulo,
                livros.autor,
                livros.preco,
                categorias.categoria AS categoria,
                editoras.nome AS editora
            FROM livros
            JOIN categorias ON livros.id_categoria = categorias.id_categoria
            JOIN editoras ON livros.id_editora = editoras.id_editora
            WHERE livros.id_livro = ?
            `,
      [id]
    );
    return rows;
  }

  async createLivro(data) {
    const { titulo, autor, preco, estoque, id_categoria, id_editora } = data;
    const [row] = await pool.execute(
      "INSERT INTO livros (titulo, autor, preco, estoque, id_categoria, id_editora) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, autor, preco, estoque, id_categoria, id_editora]
    );
    return row;
  }

  async updateLivro(id, data) {
    const { titulo, autor, preco, estoque, id_categoria, id_editora } = data;
    const [row] = await pool.execute(
      "UPDATE livros SET titulo = ?, autor = ?, preco = ?, estoque = ?, id_categoria = ?, id_editora = ? WHERE id_livro = ?",
      [titulo, autor, preco, estoque, id_categoria, id_editora, id]
    );
    return row;
  }

  async deleteLivro(id) {
    const [row] = await pool.execute("DELETE FROM livros WHERE id_livro = ?", [
      id,
    ]);
    return row;
  }
}

export default new LivroModel();