const Router = require('express');
const router = Router();
const productsController = require('../controllers/products.controller')

//Esta ruta siver para obtener productos por categorio filtrando por descuento y ordenando, PRINCIPALMENTE porque el usuario puede hacer busquedas sin ingresar un nombre
router.get('/:category/:orderby/:discount/', (req, res) => {

    const { category, orderby, discount } = req.params
    productsController.getProducts(category, orderby, discount).then(data => {
        res.status(200).json(data)
    })
})

//Esta ruta siver para obtener productos por categorio filtrando por descuento, ordenando y/o nombre
router.get('/:category/:orderby/:discount/:nameProduct', (req, res) => {

    const { category, orderby, discount, nameProduct } = req.params
    productsController.getProducts(category, orderby, discount, nameProduct).then(data => {
        res.status(200).json(data)
    })
})

module.exports = router;