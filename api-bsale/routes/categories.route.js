const Router = require('express');
const router = Router();
const categoriesController = require('../controllers/categories.controller');

//ruta para obtener todas las categorias existentes en la db
router.get('/', (req, res) => {
    categoriesController.getCategories().then(data => {
        res.status(200).json(data)
    });
});

module.exports = router;