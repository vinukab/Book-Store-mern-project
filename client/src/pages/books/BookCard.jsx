import React from "react";
import { getImgUrl } from "../../utils/getImgUrl";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/CartSlice";

export const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full sm:w-72 md:w-[24rem] bg-white border border-gray-200 rounded-lg shadow-md flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="w-28 sm:w-36 md:w-40 flex-shrink-0 bg-gray-100 flex justify-center">
        <Link to={`/books/${book._id}`} className="w-full">
          <img
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
            src={getImgUrl(book.coverImage)}
            alt={book.title}
          />
        </Link>
      </div>

      <div className="p-2 flex flex-col gap-1 flex-grow">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-sm font-bold hover:text-blue-600 transition-colors pt-4 pb-4">
            {book.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-xs">
          {book?.description?.length > 80
            ? `${book.description.slice(0, 80)}...`
            : book?.description}
        </p>

        <p className="text-base font-medium text-gray-900 flex gap-5  mx-2 mt-auto">
          ${book?.newPrice}{" "}
          <span className="text-gray-500 line-through ml-2 text-xs mt-1">
            ${book?.oldPrice}
          </span>
        </p>

        <button
          className="btn-primary w-full flex items-center justify-center gap-2 py-1  text-xs hover:scale-105 transition-transform duration-200 mt-auto mb-auto"
          onClick={() => handleAddToCart(book)}
        >
          <GiShoppingCart size={16} />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;
