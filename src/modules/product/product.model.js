const { Schema, Types, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    categoryId: { type: Types.ObjectId, ref: "Categories", required: true },
  },
  {
    collation: "products",
  }
);

module.exports = mongoose.model("Products", productSchema);
