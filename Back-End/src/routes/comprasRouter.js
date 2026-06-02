import express from "express";
// import comprasController from "../controllers/comprasController.js"
import comprasController from "../controllers/comprasController.js"

// const express = require('express');
const routeCompras = express.Router();
// const comprasController = require('../controllers/comprasController');

routeCompras.get('/', comprasController.showCompras);
routeCompras.get('/:id', comprasController.getComprasById);
routeCompras.post('/', comprasController.createCompras);
routeCompras.put('/:id', comprasController.updateCompras);
routeCompras.delete('/:id', comprasController.deleteCompras);

// module.exports = routeCompras;

export default routeCompras;