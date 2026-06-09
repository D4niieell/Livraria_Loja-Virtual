import pool from "../database/database.js";
// =============================================================================
class ClienteModel {
  async showClientes() {
    const [rows] = await pool.execute("SELECT * FROM clientes;");
    return rows;
  }
// =============================================================================
  async getClienteById(id) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE id_cliente = ?;",
      [id]
    );
    return rows[0];
  }
// =============================================================================
  async selectClienteByEmail(email,id = 0) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE email = ? AND id_cliente = ?;",
      [email],
    );
    return rows;
  }
// =============================================================================
  async getClienteByEmail(email) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE email = ?;",
      [email]
    );
    return rows;
  }
// =============================================================================
  async createCliente(data) {
    const { nome, email, telefone, cidade, estado } = data;
    const [row] = await pool.execute(
      "INSERT INTO clientes (nome, email, telefone, cidade, estado) VALUES (?, ?, ?, ?, ?);",
      [nome, email, telefone, cidade, estado]
    );
    return row;
  }
// =============================================================================
  async updateCliente(id, data) {
    const { nome, email, telefone, cidade, estado } = data;
    const [row] = await pool.execute(
      "UPDATE clientes SET nome = ?, email = ?, telefone = ?, cidade = ?, estado = ? WHERE id_cliente = ?",
      [nome, email, telefone, cidade, estado, id]
    );
    return row;
  }
// =============================================================================
  async deleteCliente(id) {
    const [row] = await pool.execute(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [id]
    );
    return row;
  }
}
// =============================================================================
export default new ClienteModel();
