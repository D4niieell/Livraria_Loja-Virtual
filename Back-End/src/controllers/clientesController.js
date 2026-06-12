import clientesModel from "../models/clientesModel.js";
import ClienteModel from "../models/clientesModel.js";
// =============================================================================
class ClienteController {
  // =============================================================================
  async showClientes(req, res) {
    try {
      const clientes = await ClienteModel.showClientes();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async getClienteById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteModel.getClienteById(id);
      if (!cliente) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async getClienteByEmail(req, res) {
    try {
      const { email } = req.params;
      const [findEmail] = await ClienteModel.getClienteByEmail(email);
      if (findEmail?.email === email) {
        return res.status(409).json({ message: "E-mail já cadastrado" });
      }
      res.json({ message: "E-mail já disponível" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async createCliente(req, res) {
    try {
      const { nome, email, telefone, cidade, estado } = req.body;

      const [findEmail] = await clientesModel.selectClienteByEmail(email);

      if (findEmail) {
        return res.json({ message: "E-mail já cadastrado" });
      }

      const result = await ClienteModel.createCliente(req.body);
      res.status(201).json({ message: "Cliente criado com sucesso!", result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // =============================================================================
  async updateCliente(req, res) {
    try {
      const [findEmail] = await clientesModel.selectClienteByEmail(
        req.body.email,
        id
      );
      const { id } = req.params;
      const result = await ClienteModel.updateCliente(id, req.body);
      res.json({ message: "Cliente atualizado com sucesso!", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      const result = await ClienteModel.deleteCliente(id, req.body);
      res.json({ message: "Cliente deletado com sucesso!", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
// =============================================================================
export default new ClienteController();
