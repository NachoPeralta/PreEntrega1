const fs = require("fs").promises;

class CartManager {
    static lastCartId = 0;

    constructor(path) {
        this.path = path;
        this.carts = path ? this.readFile() : [];
    }

    async readFile() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            this.lastCartId = cart.length > 0 ? cart[cart.length - 1].id : 0;
            
            return carts;

        } catch (error) {
            console.error("Error reading file:", error);
            return [];
        }    
    }

    async createCart() {
        const newCart = {
            id: ++this.lastCartId,
            products: []
        };

        this.carts.push(newCart);
        await this.saveFile();

        return newCart;    
    }

    async saveFile() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        return this.carts;    
    
    }

    async getCartById(id) {
        await this.readFile();
        const cart = this.carts.find(item => item.id == id);

        if (!cart) {
            return {error:"Carrito no encontrado"};
        }
        return cart;    
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.readFile();
        const cart = this.carts.find(item => item.id == cartId);

        if (!cart) {
            return {error:"Carrito no encontrado"};
        }

        const product = this.products.find(item => item.id == productId);

        if (!product) {
            return {error:"Producto no encontrado"};
        }

        cart.products.push({product:productId, quantity:quantity});
        await this.saveFile();
        return cart;    
    
    }

}

module.exports = CartManager;