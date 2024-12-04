const Users = require("./user.model");
const register = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    const existUser = await Users.findOne({ email });
    if (existUser)
      return res.send({
        success: false,
        message: "This email have been registered, please login",
      });

    let user = await Users.create({ fullname, email, password });
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(error.status || 403).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email, password });
    console.log(user);

    if (!user) {
      return res.send({
        success: false,
        message: "email or password is incorrect",
      });
    } else {
      res.send({
        success: true,
        message: "Successfully logged in",
      });
    }
  } catch (error) {
    res.status(error.status || 403).send({ error: error.message });
  }
};

module.exports = { register, login };
