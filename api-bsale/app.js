//Aqui estan todas las configuracion que necesita exprees para funcionar
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//Configurando ruta del archivo .env (variables de entorno para las credenciales)
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

//Configurando puerto de express
app.set('port', process.env.PORT || 4000);

//Configurando cors para las peticiones Origin * All
app.use(cors());

//Configurando file para la ruta de categorias
app.use('/categories', require('./routes/categories.route'));
//Configurando file para la ruta de productos
app.use('/products', require('./routes/products.route'));


//Comprueba si la API esta funcionando
app.get('/', (req, res) => {
    res.status(200).json('API WORKS');
});

module.exports = app;