const Product = require("./product.model");
const Category = require("../category/category.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      quantity,
    });

    await Category.findByIdAndUpdate(category, {
      $push: { products: product._id },
    });

    res.status(201).json({
      success: true,
      message: "Product successfully created",
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$categoryDetails",
      },
    ]);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
