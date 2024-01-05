const express = require("express");
const router = express.Router();
const cartManager = require("../service/CartManager");


router.get("/", async (req, res) => {
    try{
        const carts = await cartManager.getCarts();
        res.send({ status: "success", payload: carts });
    }catch(error){
        res.json
    }

    
})

router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);

    if (cart) {
        res.send({ status: "Success", payload: cart });
    }
})

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();

    res.send({ status: "Success", payload: cart });

})

router.post("/:cid/products/:pid", async (req, res) => {

    const cart = await cartManager.getCartById(req.params.cid);
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
})

module.exports = router;