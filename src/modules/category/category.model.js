const { Schema, Types, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
  {
    id: { type: Types.ObjectId },
    name: { type: String, require: true },
  },
  {
    collection: "categories",
  }
);

module.exports = mongoose.model("Categories", categorySchema);
