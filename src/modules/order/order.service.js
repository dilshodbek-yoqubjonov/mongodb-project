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
    const result = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
          pipeline: [
            {
              $project: {
                _id: 0,
                fullname: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                price: 1,
                quantity: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$productDetails",
      },

      {
        $addFields: {
          totalPricePerProduct: {
            $multiply: [
              "$productDetails.price", // product narxi
              "$products.quantity", // Orderdagi quantity,
            ], // 2mlnlik telefon * 4ta == result = 8mln
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          totalPrice: { $sum: "$totalPricePerProduct" },
          userDetails: { $first: "$userDetails" },
          products: { $push: "$productDetails" },
        },
      },
      {
        $project: {
          _id: 0,
          user_id: "$userDetails._id",
          "userDetails.name": 1,
          "userDetails.email": 1,
          products: 1,
          totalPrice: 1,
        },
      },
    ]);

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
