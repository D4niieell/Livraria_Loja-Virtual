import express from 'express'
import EditoraController from "../controllers/editoraController.js"

const routerEditoras = express.Router();


routerEditoras.get('/', EditoraController.showEditoras);
routerEditoras.get('/:id', EditoraController.getEditoraById);
// routerEditoras.post('/', );
// routerEditoras.put('/:id', );
// routerEditoras.delete('/:id', );

export default routerEditoras;