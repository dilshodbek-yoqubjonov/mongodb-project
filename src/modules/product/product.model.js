const { Schema, Types, default: mongoose } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    category: { type: Types.ObjectId, ref: "Categories", required: true },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Products", productSchema);
