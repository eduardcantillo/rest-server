const express = require("express");
const cors =require("cors");

const {dbConnection} = require('../database/config');


class Server {
    constructor() {

        this.app = express();
        this.usuariosRoutePath="/api/usuarios";
        this.apiAuth="/api/auth";
        //Coneccion a mongo DB
        this.conectarDB();


        this.middleware();

        this.routes();
        this.port = process.env.PORT;

    }

    async conectarDB(){
        await dbConnection()
    }

    routes() {
        this.app.use(this.apiAuth,require("../routes/auth.routes"));
        this.app.use(this.usuariosRoutePath,require("../routes/usuario.routes"));
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    listen() {
        this.app.listen(this.port, console.log(`Escuchando en el puerto ${this.port}`));
    }
}

module.exports = Server;