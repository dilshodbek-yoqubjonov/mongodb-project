const { Router } = require("express");
const userRouter = require("../modules/user/route");
const categoryRouter = require("../modules/category/route");
const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;
