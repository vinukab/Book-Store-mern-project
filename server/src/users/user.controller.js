const User = require("./user.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username });
    if (!admin) {
      res.status(404).send({ message: "admin not found" });
    }
    if (admin.password !== password) {
      res.status(401).send({ message: "invalid password" });
    }

    //sign() method is used to generate a token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return  res.status(200).send({
        message:"authentication succcessful",
        token: token, 
        user:{
          
          username: admin.username,
          role: admin.role,
        },
    })
  } catch (error) {
    res.status(401).send({ message: "failed to login" });
  }
};

module.exports = { createAdmin };
