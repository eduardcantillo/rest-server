require("dotenv").config();
const { Server } = require("./Models");

const server = new Server();

server.listen();