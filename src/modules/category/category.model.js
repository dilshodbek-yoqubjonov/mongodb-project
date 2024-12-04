const { Schema, Types, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, required: true, set: (name) => name.toLowerCase() },
    products: [{ type: Types.ObjectId, ref: "Products" }],
  },
  {
    collection: "categories",
  }
);

module.exports = mongoose.model("Categories", categorySchema);
