const express = require("express");
const { createAOrder, getOrderByEmail } = require("./order.controller");


const router = express.Router();

//create an order
router.post("/", createAOrder);

//get an order by id
router.get("/email/:email",getOrderByEmail)
module.exports = router;
