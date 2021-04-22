//Este archivo tiene algunos metodos que seran invocados en otros archivos
const Category = require('../models/Category')
const Product = require('../models/Product')

//Este metodo convierte los resuotados crudos del mysql en arrays de objetos de la clase category
const toArrayCategory = (raw = []) => {
    return raw.map(e => new Category(e.id, e.name))
}

//Este metodo convierte los resuotados crudos del mysql en arrays de objetos de la clase product
const toArrayProduct = (raw = []) => {
    return raw.map(e => new Product(e.id, e.name, e.url_image, e.price, e.discount, e.category))
}

module.exports = {
    toArrayCategory,
    toArrayProduct
}