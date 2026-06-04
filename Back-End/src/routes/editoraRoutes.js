import express from 'express'
import EditoraController from "../controllers/editoraController.js"

const routerEditoras = express.Router();


routerEditoras.get('/', EditoraController.showEditoras);
routerEditoras.get('/:id', EditoraController.getEditoraById);
routerEditoras.post('/', EditoraController.createEditora);
routerEditoras.put('/:id', EditoraController.updateEditora);
routerEditoras.delete('/:id', EditoraController.deleteEditora);

export default routerEditoras;