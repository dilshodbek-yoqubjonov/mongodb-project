const Product = require("./product.model");
const Category = require("../category/category.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, quantity } = req.body;

    // Category mavjudligini tekshiramiz
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Product yaratamiz
    const product = await Product.create({
      name,
      price,
      description,
      category,
      quantity,
    });

    // Yaratilgan productni categoryga qo'shamiz
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
    const products = await Product.find().populate("categoryId");

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

// Bitta mahsulotni ID bo'yicha olish
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Mahsulot topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Mahsulotni yangilash
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Mahsulot topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Mahsulot muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Mahsulotni o'chirish
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Mahsulot topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mahsulot muvaffaqiyatli o'chirildi",
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
  getProductById,
  updateProduct,
  deleteProduct,
};
