const Order = require("./order.model");

const createAOrder = async (req,res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to place order", error: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).populate(
      "productsId",
      "title"
    );
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    } else {
      return res.status(200).json(orders);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to fetch order", error: error.message });
  }
};

module.exports = { createAOrder, getOrderByEmail };
