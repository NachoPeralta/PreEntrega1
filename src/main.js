const ProductManager = require('./service/ProductManager');
const Server = require('./service/Server');

// Se creará una instancia de la clase “ProductManager”
console.log("*********************************************");
console.log("Instancia de la clase ProductManager");
const productManager = new ProductManager("./products.json");
console.log("*********************************************");

// Se declara la funcion getProductData como async para poder usar await de lo contrario devuelve "promise - pending"
async function getProductData() {
    let products = await productManager.getProducts();
    console.log(products);
}

// Se llamará a la funcion run para llamar a las funciones getProducts y addProduct utilizando await, para ejecutar en orden cada test
function run() {
    return new Promise(async (resolve) => {
        // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
        console.log("Llamada a getProducts:");
        await getProductData();
        console.log("*********************************************");

        // Se llamará al método “addProduct” con los campos:
        // title: “producto prueba”
        // description:”Este es un producto prueba”
        // price:200,
        // thumbnail:”Sin imagen”
        // code:”abc123”,
        // stock:25

        // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
        console.log("Llamada a addProduct:");

        let newProduct = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };

        await productManager.addProduct(newProduct);
        console.log("*********************************************");

        // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
        console.log("Llamada a getProducts con productos:");
        await getProductData();
        console.log("*********************************************");

        // Este Caso de test es del primer entregable, lo deje a modo de control.
        // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
        console.log("Llamada a addProduct Repetido:");

        let repeatedProduct = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };
        await productManager.addProduct(repeatedProduct);
        console.log("*********************************************");

        //Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado.
        // En caso de no existir, debe arrojar un error.
        console.log("Llamada a getProductById 1 (producto existente):");
        console.log(await productManager.getProductById(1));

        console.log("*********************************************");
        // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto.
        // Se evaluará que no se elimine el id y que sí se haya hecho la actualización.
        console.log("Llamada a updateProduct 1:");
        console.log(await productManager.updateProduct(1,
            {
                title: "producto updated",
                description: "Este es un producto actualizado",
                price: 250,
                thumbnail: "Sin imagen",
                code: "abc123",
                stock: 50
            }));
        console.log("*********************************************");

        // Se llamará al método “deleteProduct”. 
        // Se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
        console.log("Llamada a deleteProduct 1:");
        console.log(await productManager.deleteProduct(1));
        console.log("*********************************************");

        // Pruebo agregar varios productos para probar generar los id automáticos sin repetirse. 
        // Uso los productos para Testing del nuevo Servidor creado   
        let p1 = {
            title: "producto prueba 1",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc1",
            stock: 25
        };
        let p2 = {
            title: "producto prueba 2",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc2",
            stock: 25
        };
        let p3 = {
            title: "producto prueba 3",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc3",
            stock: 25
        };
        let p4 = {
            title: "producto prueba 4",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc4",
            stock: 25
        };
        let p5 = {
            title: "producto prueba 5",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc5",
            stock: 25
        };
        let p6 = {
            title: "producto prueba 6",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc6",
            stock: 25
        };
        let p7 = {
            title: "producto prueba 7",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc7",
            stock: 25
        };
        let p8 = {
            title: "producto prueba 8",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc8",
            stock: 25
        };
        let p9 = {
            title: "producto prueba 9",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc9",
            stock: 25
        };
        let p10 = {
            title: "producto prueba 10",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc10",
            stock: 25
        };

        await productManager.addProduct(p1);
        await productManager.addProduct(p2);
        await productManager.addProduct(p3);
        await productManager.addProduct(p4);
        await productManager.addProduct(p5);
        await productManager.addProduct(p6);
        await productManager.addProduct(p7);
        await productManager.addProduct(p8);
        await productManager.addProduct(p9);
        await productManager.addProduct(p10);

        await getProductData();
    });
}

console.log("Instancia de la clase Server");
const myServer = new Server(productManager);

console.log("*********************************************");
console.log("Iniciando Servidor...");
myServer.start();
console.log("*********************************************");