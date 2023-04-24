
const express = require('express')
const cors    = require('cors')

const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        // Conectar a BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi apicación
        this.routes(); 
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.usuariosPath, require('../routes/usuarios.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port)
        })
    }


}



module.exports = Server;