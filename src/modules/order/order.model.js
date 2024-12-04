const { Schema, Types, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    products: [
      {
        productId: { type: Types.ObjectId, ref: "Products", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: { type: String, required: true },
    clientPhone: { type: Number, required: true },
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Orders", orderSchema);
