const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.service");

const productRouter = Router();

productRouter.post("/create", createProduct);


module.exports =productRouter