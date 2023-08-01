const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

const fileUpload = require('express-fileupload')

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            user: '/api/user',
            categoria: '/api/categoria',
            producto: '/api/producto',
            uploads: '/api/uploads',
        }

        //conexion a la base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //lectura y parseo del JSON
        this.app.use( express.json())

        //directorio publico
        this.app.use( express.static('public'));

        //Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth , require('../routers/auth'));
        this.app.use(this.paths.user , require('../routers/user'));
        this.app.use(this.paths.categoria , require('../routers/categoria'));
        this.app.use(this.paths.producto , require('../routers/producto'));
        this.app.use(this.paths.buscar , require('../routers/buscar'));
        this.app.use(this.paths.uploads , require('../routers/uploads'));
    }

    listen() {
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en el puerto ', process.env.PORT)
        })
    }
}

module.exports = Server;