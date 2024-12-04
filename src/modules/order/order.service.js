const Order = require("./order.model");

const createOrder = async () => {
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
    return await order.save();
  } catch (error) {
    throw new Error(`Buyurtma yaratishda xatolik: ${error.message}`);
  }
};

const getAllOrders = async () => {
  try {
    return await Order.find()
      .populate("user_id", "name email")
      .populate("products.productId", "name price");
  } catch (error) {
    throw new Error(`Buyurtmalarni olishda xatolik: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
