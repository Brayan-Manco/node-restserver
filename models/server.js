const express = require('express');
const cors = require('cors')

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        //middlewares
        this.middlewares();

        //rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del JSON
        this.app.use( express.json())

        //directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use('/api/user', require('../routers/user'));
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en el puerto ', process.env.PORT)
        })
    }

}

module.exports = Server;