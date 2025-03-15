//defines functions to handle requests to the server
// and sends responses back to the client

const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(201).send({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).send({ message: "failed to add book", error: err.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    if (books.lenght == 0) {
      res.status(404).send({ message: "No books found" });
    } else {
      res.status(200).send(books);
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "failed to get books", error: err.message });
  }
};

const getSingleBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404).send({ message: "Book not found" });
  } else {
    res.status(200).send(book);
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Failed to update the book" });
    } else {
      res
        .status(200)
        .send({ message: "Book updated successfully", book: updatedBook });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.status(200).send({ message: "Book deleted successfully" });
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "failed to delete book", error: err.message });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
