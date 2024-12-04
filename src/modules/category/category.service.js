const categoryModel = require("./category.model");

const createCategory = async (req, res) => {
  let { name } = req.body;

  let category = await categoryModel.findOne({
    name: name.toLowerCase(),
  });

  if (category) {
    return res.send({
      success: false,
      message: "Exist category please choose another",
    });
  } else
    res.send({
      success: true,
      message: "Category successfully added",
    });
};

module.exports = createCategory;
