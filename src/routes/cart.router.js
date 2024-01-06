const express = require("express");
const router = express.Router();
const CartManager = require("../service/CartManager");
const cartManager = new CartManager("./src/models/carts.json");


router.get("/", async (req, res) => {
    
    try{
        const carts = await cartManager.getCarts();
        res.send({ status: "success", payload: carts });
    }catch(error){
        res.send({ status: "error", error: "No se pudieron cargar los carritos"});
    }    
})

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);

    if (cart) {
        res.send({ status: "Success", payload: cart });
    }else {
        res.send({ status: "Error", error: "Carrito no encontrado" });
    }
})

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ status: "Success", payload: cart });

})

router.post("/:cid/products/:pid", async (req, res) => {
    let cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
        res.send({ status: "Error", error: "Carrito no encontrado" });
        return;
    }

    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
        res.send({ status: "Error", error: "Producto no encontrado" });
        return;
    }

    cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.send({ status: "Success", payload: cart });
});


module.exports = router;