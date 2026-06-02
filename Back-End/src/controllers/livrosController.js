import livrosModel from "../models/livrosModel.js";

class LivrosController {
  async showLivro(req, res) {
    const result = await livrosModel.showLivros();
    res.json(result);
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }

  async getLivroById(req, res) {
    const { id } = req.params;
    const result = await livrosModel.getLivroById(id);

    if (result.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }
    res.json(result);
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }

  async createLivro(req, res) {
    const result = await livrosModel.createLivro(req.body);
    res.status(201).json({ error: error.message });
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }

  async updateLivro(req, res) {
    const { id } = req.params;
    await livrosModel.updateLivro(id, req.body);
    res.json({ message: "Livro atuaizado com sucesso!" });
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }

  async deleteLivro(req, res) {
    const { id } = req.params;
    await livrosModel.deleteLivro(id);
    res.json({ message: "Livro deletado com sucesso!" });
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }
}

export default new LivrosController();
