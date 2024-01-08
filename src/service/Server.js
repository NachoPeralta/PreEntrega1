const express = require("express");
const productsRouter = require("../routes/products.router");
const cartRouter     = require("../routes/cart.router.js");

class Server {
    // Se creará una instancia de express para crear el servidor.
    constructor() {
        this.app = express();
        this.port = 8080;
    }

    // Se crea un método para levantar el servidor al iniciar la aplicación.
  async start() {
        this.app.listen(this.port, () => {
            // Se corroborará que el servidor esté corriendo en el puerto 8080.
            console.log(`Servidor escuchando en puerto: ${this.port}`);
        });
        
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use("/api/products", productsRouter); 
        this.app.use("/api/carts", cartRouter);
    }
}
module.exports = Server;