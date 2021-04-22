const pool = require('../database');
const myUtils = require('../utils/myUtils')

//En este controlador ira toda la logica para las consultas.
const getCategories = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id,name FROM category ORDER BY name', (err, result) => {
            if (err) reject(new Error(err));
            resolve(myUtils.toArrayCategory(result))
        });
    });
}

module.exports = {
    getCategories
}