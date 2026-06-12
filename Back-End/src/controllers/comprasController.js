import comprasModel from "../models/comprasModel.js";
// =============================================================================
class ComprasController {
  async showCompras(req, res) {
    try {
      const result = await comprasModel.showCompras();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async getComprasById(req, res) {
    try {
      const { id } = req.params;
      const result = await comprasModel.getComprasById(id);
      if (result.length === 0) {
        return res.status(404).json({ message: "Compra não encontrada." });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async createCompras(req, res) {
    try {
      const result = await comprasModel.createCompras(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async updateCompras(req, res) {
    try {
      const { id } = req.params;
      await comprasModel.updateCompras(id, req.body);
      res.json({ message: "Compra atualizada com sucesso." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async deleteCompras(req, res) {
    try {
      const { id } = req.params;
      await comprasModel.deleteCompras(id);
      res.json({ message: "Compra removida com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
// =============================================================================
export default new ComprasController();
