
import { Router } from "express";
import CartManager from "cartManager.js";

const cartRouter = Router();
const cartManager = new CartManager("carts.json");

cartRouter.get("/", async (req, res) => {
  await cartManager.createCart();
  return res.status(201).json({ message: "Cart created" });
});

cartRouter.get("/:cartId", async (req, res) => {
  try {
    const cartId = +req.params.cartId;
    const { products } = await cartManager.getCart(cartId);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: "Cart not found" });
  }
});

cartRouter.post("/:cartId/product/:productId/", async (req, res) => {
  const cartId = +req.params.cartId;
  const productId = +req.params.productId;
  const addProduct = await cartManager.addProduct(cartId, productId);

  if (!addProduct)
    return res.status(404).json({ message: "Not found" });

  return res
    .status(201)
    .json({
      message: `Product added successfully`,
    });
});

export default cartRouter;

