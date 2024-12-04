const { Router } = require("express");

const userRouter = require("../modules/user/route");
const categoryRouter = require("../modules/category/route");
const ordersRouter = require("../modules/order/route");
const productRouter = require("../modules/product/route");

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/order", ordersRouter);
router.use("/product", productRouter);
module.exports = router;
