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

            this.lastCartId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
            
            return this.carts;

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
    
        const cartIndex = this.carts.findIndex(item => item.cartId == cartId);
    
        if (cartIndex === -1) {
            return { error: "Carrito no encontrado" };
        }
    
        const cart = this.carts[cartIndex];
        const productIndex = cart.products.findIndex(item => item.productId == productId);
    
        if (productIndex !== -1) {
            // Si el producto ya existe en el carrito, actualiza la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no existe, agrégalo al carrito
            cart.products.push({
                productId: productId,
                quantity: quantity
            });
        }
    
        await this.saveFile();
        return cart;
    }
    

}

module.exports = CartManager;