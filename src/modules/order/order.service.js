const Order = require("./order.model");

const createOrder = async (req, res) => {
  try {
    const { user_id, name, products, totalPrise, address, clientPhone } =
      req.body;
    const order = new Order({
      user_id,
      name,
      products,
      totalPrise,
      address,
      clientPhone,
    });
    await order.save();

    res.send({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await Order.find()
      .populate("user_id", "name email")
      .populate("products.productId", "name price");

    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
