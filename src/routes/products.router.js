
const express = require("express");
const router = express.Router();
const productManager = require("../service/ProductManager");


router.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);

    const products = await productManager.getProducts();

    if (limit) {
        res.send({status:"success",payload:products.slice(0, limit)});
    } else {
        res.send({status:"success",payload:products});
    }
})

router.get("/:pid", async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);

    if (product) {
        res.send({status:"Success",payload:product});
    }
})

router.post("/", async (req, res) => {
    const product = req.body;

    const newProduct = await productManager.addProduct(product);

    res.send({status:"Success",payload:newProduct});

})

router.put("/:pid", async (req, res) => {
    const product = req.body;

    const updatedProduct = await productManager.updateProduct(req.params.pid, product);

    res.send({status:"Success",payload:updatedProduct});

})

router.delete("/:pid", async (req, res) => {
    const products = await productManager.deleteProduct(req.params.pid);

    res.send({status:"Success",payload:products});
    res.status({});

})


module.exports = router;