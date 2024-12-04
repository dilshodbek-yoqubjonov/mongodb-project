const { Router } = require("express");
const { createProduct, getAllProducts } = require("./product.service");

const productRouter = Router();

productRouter.post("/create", createProduct).get("/all", getAllProducts);

module.exports = productRouter;
