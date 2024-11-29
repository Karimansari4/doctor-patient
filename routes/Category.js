const express = require('express');
const { getAllCategory, getCategoryById, addCategory, deleteCategory } = require('../controllers/Category');
const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategory)

categoryRouter.get('/:id', getCategoryById)


categoryRouter.post('/add', addCategory)

categoryRouter.delete('/:id', deleteCategory)

module.exports = categoryRouter