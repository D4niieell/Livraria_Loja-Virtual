import EditoraModel from "../models/editoraModels.js";

class EditoraController {
  async showEditoras(req, res) {
    const editoras = await EditoraModel.showEditora();
    res.json(editoras);
  }

  async getEditoraById(req, res) {
    const { id } = req.params;
    const editora = await EditoraModel.getEditoraById(id);
    if (!editora) {
      return res.status(404).json({ message: "Editora não encontrada!" });
    }
    res.json(editora);
  }
}

export default new EditoraController();
