const { createOrder, getAllOrders } = require("./order.service");

const ordersRouter = Router();

ordersRouter.post("/create", createOrder).get("/all", getAllOrders);

module.exports = ordersRouter;
