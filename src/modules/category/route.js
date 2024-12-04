const { Router } = require("express");
const { createCategory, getAllCategory } = require("./category.service");

const categoryRouter = Router();

categoryRouter.post("/create", createCategory).get("/all", getAllCategory);

module.exports = categoryRouter;
