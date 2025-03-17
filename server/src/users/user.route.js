const express = require("express");
const { createAdmin } = require("./user.controller");
const router = express.Router();

//create admin
router.post("/admin",createAdmin)
module.exports = router;