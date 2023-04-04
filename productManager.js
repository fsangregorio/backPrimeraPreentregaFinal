
class ProductManager {
    #products = []
    path = ``;
    lastId = 1

    constructor() {
        this.#products = [];
        this.path = `./productos.json`;
    }

     async getProducts() {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productsFile)
        } catch (e) {
            await fs.promises.writeFile(this.path, "[]")
            return ("No products")
        }
    }

    async addProduct(product) {
        try {
            const { title, description, price, thumbnail, code, stock } = product;

            const productsFile = await fs.promises.readFile(this.path, "utf-8")

            let newProducts = JSON.parse(productsFile)

            const valid = newProducts.find(
                (p) => p.id === product.id || p.code === product.code
            );

            if (valid) {
                throw new Error("Not valid");
            }

            if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {

                throw new Error("All fields requiered");

            } else {
                this.lastId = Math.max(...newProducts.map(p => p.id)) + 1;
                newProducts.push({
                    id: this.lastId++,
                    ...product,
                })
            }

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
            return "Product added";
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let idProduct = JSON.parse(productsFile);

            const searchProduct = idProduct.find((p) => p.id === id);
            if (!searchProduct) {
                throw new Error("Not found");
            }
            return searchProduct;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, product) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(productsFile);

            let idProduct = products.findIndex((p) => p.id === id);

            products.splice(idProduct, 1, { id, ...product });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

            return "Product modified"

        } catch (error) {
            throw new Error(error)
        }

    }

    async deleteProduct(id) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(productsFile);

            const idProduct = products.find((p) => p.id === id);
            if (!idProduct) {
                throw new Error("Product not found")
            }

            let productDelete = products.filter((p) => p.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, 2))

            return "Deleted product: " + id

        } catch (error) {
            throw new Error(error)
        }
    }
}

const main = async () =>
{
  try
  {
    const productManager = new ProductManager();

    await productManager.loadData();

    const res = await productManager.createProduct({title: "Pelota", description: "Pelota de fútbol", price: 5000, thumbnail: "./img0.jpg", code: 1, stock: 200});

    console.log(res);
    await productManager.createProduct({title: "Pelota", description: "Pelota de fútbol", price: 5000, thumbnail: "./img1.jpg", code: 2, stock: 200});
    await productManager.createProduct({title: "Raqueta", description: "Raqueta de Tenis", price: 400, thumbnail: "./img2.jpg", code: 3, stock: 200});
    await productManager.createProduct({title: "Patines", description: "Patines", price: 700, thumbnail: "./img3.jpg", code: 4, stock: 200});
    await productManager.createProduct({title: "Patineta", description: "Patineta azul", price: 600, thumbnail: "./img4.jpg", code: 5, stock: 200});
    await productManager.createProduct({title: "Guantes", description: "Guantes verdes", price: 5500, thumbnail: "./img5.jpg", code: 6, stock: 200});
    await productManager.createProduct({title: "Remera", description: "Remera blanca", price: 5000, thumbnail: "./img6.jpg", code: 7, stock: 200});
    await productManager.createProduct({title: "Pantalon", description: "Pantalón corto", price: 1000, thumbnail: "./img7.jpg", code: 8, stock: 200});
    await productManager.createProduct({title: "Medias", description: "Medias blancas", price: 4000, thumbnail: "./img8.jpg", code: 9, stock: 200});
    await productManager.createProduct({title: "Botines", description: "Botines amarillos", price: 2500, thumbnail: "./img8.jpg", code: 10, stock: 200});
    await productManager.createProduct({title: "Paleta", description: "Paleta chica", price: 3000, thumbnail: "./img10.jpg", code: 11, stock: 200});
    await productManager.createProduct({title: "Buzo", description: "Buzo Nike", price: 500, thumbnail: "./img11.jpg", code: 12, stock: 200});
    
    const products = await productManager.readProducts();
    console.log(products);
  }
  catch (error)
  {
    console.log(error);
  }
}

main();
 

export default ProductManager;