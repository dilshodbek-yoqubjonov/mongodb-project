const { Router } = require("express");
const userRouter = require("../modules/user/route");
const router = Router();

router.use("/user", userRouter);

module.exports = router;
