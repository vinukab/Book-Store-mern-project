//defines the endpoints for the server
// and handles the requests to those endpoints

//frontend => backend server => controller => book schema => database => send response back to the server => send response back to the frontend

const express = require("express");
const router = express.Router();
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// POST request to add a new book
router.post("/add",verifyAdminToken, postABook);

// GET request to get all books
router.get("/", getAllBooks);

// GET request to get a single book by ID
router.get("/:id", getSingleBook);

// PUT request to update a book by ID
router.put("/edit/:id", verifyAdminToken, updateBook);

// DELETE request to delete a book by ID
router.delete("/delete/:id", verifyAdminToken, deleteBook);

module.exports = router;
