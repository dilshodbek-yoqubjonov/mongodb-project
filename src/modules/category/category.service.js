const categoryModel = require("./category.model");

const createCategory = async (req, res) => {
  try {
    let { name } = req.body;

    let category = await categoryModel.findOne({
      name: name.toLowerCase(),
    });

    if (category) {
      return res.send({
        success: false,
        message: "Exist category please choose another",
      });
    } else await categoryModel.create({ name });

    res.send({
      success: true,
      message: "Category successfully added",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const data = await categoryModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                description: 1,
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
    ]);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = { createCategory, getAllCategory };
