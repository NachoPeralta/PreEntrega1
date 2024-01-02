const fs = require("fs").promises;

class ProductManager {
    static lastId = 0;

    constructor(path) {
        this.path = path;
        this.products = path ? this.readFile() : [];
    }

    async addProduct(newProduct) {

        let { title, description, price, thumbnail, code, stock } = newProduct;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Los datos no pueden estar vacios");
            return;
        }
        if (this.products.some(item => item.code === code)) {
            console.log("El codigo de producto ya existe");
            return;
        }

        const product = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(product);
        await this.saveFile();
    }

    async getProducts() {
        await this.readFile();
        return this.products;
    }

    async getProductById(id) {
        await this.readFile();
        const product = this.products.find(item => item.id == id);

        if (!product) {            
            return {error:"Producto no encontrado"};
        }
        return product;
    }

    async readFile() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);

        } catch (error) {
            console.log("Error al leer archivo:", error);
        }
    }

    async saveFile() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.path, data);
            console.log("Productos Guardados");

        } catch (error) {
            console.log("Error al guardar archivo:", error);
        }

    }

    async updateProduct(id, newData) {
        await this.readFile();
        const index = this.products.findIndex(item => item.id === id);

        if (index === -1) {
            console.log("Producto no encontrado");
            return;
        }

        const product = this.products[index];
        const updatedProduct = { ...product, ...newData };
        this.products[index] = updatedProduct;
        await this.saveFile();
        return updatedProduct;
    }

    async deleteProduct(id) {
        await this.readFile();
        const index = this.products.findIndex(item => item.id === id);

        if (index === -1) {
            console.log("Producto no encontrado");
            return;
        }

        this.products.splice(index, 1);
        await this.saveFile();
        return this.products;
    }

}


module.exports = ProductManager;