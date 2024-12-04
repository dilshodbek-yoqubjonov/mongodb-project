const { Router } = require("express");
const createCategory = require("./category.service");

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);

module.exports = categoryRouter;
