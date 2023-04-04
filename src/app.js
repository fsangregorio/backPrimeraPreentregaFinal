
import express from 'express'

import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8088, () => {
console.log('Server listens to port 8088');
});

