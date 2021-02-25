const express = require('express');
const cors = require('cors');
const colors = require('colors');

const {socketController} = require('../sockets/controller');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); // Data of all connected sockets

        this.paths = {};
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
        // Sockets / Conectores
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Public directory
        this.app.use( express.static('public') );
    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connect', socketController ); // "connection" event / Server connection!
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Server running on port'.blue, this.port );
        });
    }
}

module.exports = Server;
