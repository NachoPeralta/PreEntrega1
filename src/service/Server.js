const express = require("express");


class Server {
    // Se creará una instancia de express para crear el servidor.
    constructor(productManager) {
        this.app = express();
        this.port = 8080;
        this.productManager = productManager;
    }

    // Se crea un método para levantar el servidor al iniciar la aplicación.
  async start() {
        this.app.listen(this.port, () => {
            // Se corroborará que el servidor esté corriendo en el puerto 8080.
            console.log(`Servidor escuchando en puerto: ${this.port}`);
        });
        
        this.app.use(express.urlencoded({ extended: true }));

        // Me declaro los endpoints        
        this.app.get("/products", async (req, res) => {
            let limit = parseInt(req.query.limit);
            
            const products = await this.productManager.getProducts();
        
            if (limit) {                
                // Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
                res.send(products.slice(0, limit));
            } else {
                // Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.
                res.send(products);
            }
        })
        
        this.app.get("/products/:pid", async (req, res) => {
            const product = await this.productManager.getProductById(req.params.pid);
            
            if (product) {
                // Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
                // Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, 
                // al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
                res.send(product);
            }
        })
    }
}
module.exports = Server;