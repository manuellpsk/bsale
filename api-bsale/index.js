//este archivo solo se encarga de correr express.
const app = require('./app')

//Corriendo express
app.listen(app.get('port'), () => {
    console.log(`Express running on port ${app.get('port')}`);
});