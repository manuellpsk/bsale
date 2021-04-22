const mysql = require('mysql');
const { promisify } = require('util');
//Credenciales db
const credenciales = {
    host: process.env.HOST_DB,
    user: process.env.USUARIO_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB
};
//Creando pool de conexion mysql para luego exportar y hacer consultas
const pool = mysql.createPool(credenciales);

//Comprobando la conexion a la db
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('SE PERDIO CONECCION CON DB');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('CONEXION PERDIDA');
        }
        return
    }
    if (connection) {
        connection.release();
        console.log('DB conectada');
    }
    return;
});

//Conviritendo querys en promesas, para luego usar async await
pool.query = promisify(pool.query);

//exportando el objeto pool, el cual permite realizar consultas a la db
module.exports = pool;