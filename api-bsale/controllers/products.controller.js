const pool = require('../database');
const myUtils = require('../utils/myUtils')

const getProducts = (category = 0, orderby = 0, discount = 0, nameProduct = '') => {

    //Este switch es para saber en que forma se debe ordenar la consulta, nombre de campo, ASC o DESC, por defecto la consulta ordena por id ASC
    let campo, sentido;
    switch (parseInt(orderby)) {
        //order by name asc
        case 1:
            campo = 'name';
            sentido = 'ASC';
            break;
        //order by price asc (menor)
        case 2:
            campo = 'price';
            sentido = 'ASC';
            break;
        //order by price desc (mayor)
        case 3:
            campo = 'price';
            sentido = 'DESC';
            break;
        default:
            campo = 'id';
            sentido = 'ASC';
            break;
    }


    //Creando query para la consulta y evitar SQL INJECCTION
    let usedCategory = false, usedDiscount = false; //Estas son variables de apoyo para formular la query

    //Array donde se almacenaran el valor de los parametros en mysql.
    const parameterSQL = []
    let query = "SELECT * FROM product"
    if (category > 0) {
        query += " WHERE category = ?";
        parameterSQL.push(category)
        usedCategory = true;
    }
    if (discount > 0) {
        usedCategory ? query += " AND discount > 0" : query += " WHERE discount > 0";
        usedDiscount = true
    }
    if (nameProduct.length > 0) {
        nameProduct = '%' + nameProduct?.toLowerCase() + '%';
        (usedDiscount || usedCategory) ? query += " AND LOWER(name) LIKE ?" : query += " WHERE LOWER(name) LIKE ?";
        parameterSQL.push(nameProduct)
    }

    query += ` ORDER BY ${campo} ${sentido}`;

    return new Promise((resolve, reject) => {
        pool.query(query, parameterSQL, (err, result) => {
            if (err) reject(new Error(err));
            resolve(myUtils.toArrayProduct(result))
        });
    })
}

module.exports = {
    getProducts
}