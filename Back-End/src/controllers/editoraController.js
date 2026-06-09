import EditoraModel from "../models/editoraModels.js";
// =============================================================================
class EditoraController {
// =============================================================================
  async showEditoras(req, res) {
    try {
      const editoras = await EditoraModel.showEditora();
      res.json(editoras);  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// =============================================================================
  async getEditoraById(req, res) {
    try {
      const { id } = req.params;
      const editora = await EditoraModel.getEditoraById(id);
      if (!editora) {
        return res.status(404).json({ message: "Editora não encontrada!" });
    }
      res.json(editora);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// =============================================================================
  async createEditora(req, res) {
    try {
      const dados = req.body;
      const novaEditora = await EditoraModel.createEditora(dados);
      res.status(201).json(novaEditora);  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async updateEditora(req, res) {
    try {
      const { id } = req.params;
      const result = await EditoraModel.updateEditora(id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Editora não encontrada! "});
      }
      res.json({ message: "Editora atualizada com sucesso!", result});     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // =============================================================================
  async deleteEditora(req, res) {
    try {
      const { id } = req.params;
      const result = await EditoraModel.deleteEditora(id);
      if (!result) {
        return res.status(404).json({ message: "Editora não encontrada!" });
      }
      res.json({ message: "Editora deletada com sucesso!", result});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
// =============================================================================
export default new EditoraController();
