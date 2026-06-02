import CategoriaModel from "../models/categoriaModel.js";

class CategoriaController {
        async showCategorias(req, res) {
            try {
                const categorias = await CategoriaModel.showCategorias();
                return res.status(200).json(categorias);
            } catch(error) {
                res.status(500).json({ error: error.message});
            }
        }

        async updateCategoria(req, res) {
            try {
                const { id } = req.params;
                const result= await CategoriaModel.updateCategoria(id, req.body);
                res.json({ message: 'Categoria atualizada com sucesso!', result });
            } catch(error) {
                res.status(500).json({ error: error.message });
            }
        }
    
        async deleteCategoria(req, res) {
            try {
                const { id } = req.params;
                const result = await CategoriaModel.deleteCategoria(id);
                res.json({message: 'Categoria deletada com sucesso!', result});
            } catch (error) {
                res.status(500).json({ error: error.message});
            }
        }
    
    }

export default new CategoriaController();
