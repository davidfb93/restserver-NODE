
const express = require('express')
const cors    = require('cors')

const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
        }
        
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
        this.app.use( this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port)
        })
    }


}



module.exports = Server;