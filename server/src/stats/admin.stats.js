const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order.model");
const Book = require("../books/book.model");
const router = express.Router();

// Function to calculate admin stats
router.get("/", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    //Total sales (sum of all totalPrice from orders)
    //will return and array with a single object
    //[{_id: nul,totalSales: total sales amount}]
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    //Trending books statistics:
    //counts the number of matching documents and stores the result in trendingBooksCount
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } }, // Match only trending books
      { $count: "trendingBooksCount" },
    ]);

    //If you want just the count as a number, you can extract it like this:
    //trendingBookCount array would looklike this [{ trendingBooksCount: 5 }]
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    const totalBooks = await Book.countDocuments();

    //Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
          totalSales: { $sum: "$totalPrice" }, //get the total sales for each month
          totalOrders: { $sum: 1 }, //increments by 1 for each document in the group
        },
      },
      { $sort: { _id: 1 } }, //sorts the result based on the "Y-M" format
    ]);

    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
