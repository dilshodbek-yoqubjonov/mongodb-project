const { Router } = require("express");
const { register, login } = require("./user.service");

const userRouter = Router();

userRouter.post("/register", register).post("/login", login);

module.exports = userRouter;
