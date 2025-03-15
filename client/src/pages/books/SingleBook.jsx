import React from "react";
import { useFetchSingleBookQuery } from "../../redux/features/cart/booksApi";
import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { getImgUrl } from "../../utils/getImgUrl";
import LoadingComponent from "../../components/Loading";

import {
  FaBookOpen,
  FaTag,
  FaCalendarAlt,
  FaStar,
  FaUser,
} from "react-icons/fa";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchSingleBookQuery(id);

  if (isLoading) {
    return (
      <LoadingComponent />
    );
  }

  if (isError || !book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Oops! Book not found
          </h2>
          <p className="text-gray-600">
            We couldn't find the book you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 flex justify-center bg-gray-50">
            <img
              src={getImgUrl(book.coverImage)}
              alt={`${book.title} cover`}
              className="h-80 object-contain rounded-md shadow-md transition-transform hover:scale-105"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-black mb-3">{book.title}</h1>
            <div className="mb-5">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-black rounded-full">
                {book.category}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <FaUser className="text-black mr-2" />
                <span className="text-gray-700">
                  Author: {book.author || "Unknown"}
                </span>
              </div>

              <div className="flex items-center">
                <FaTag className="text-black mr-2" />
                <span className="text-gray-700">
                  $ {book.newPrice || "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-black mr-2" />
                <span className="text-gray-700">
                  Published: {book.publishYear || "N/A"}
                </span>
              </div>
              <div className="flex items-center">
                <FaBookOpen className="text-black mr-2" />
                <span className="text-gray-700">
                  {book.pages || "N/A"} pages
                </span>
              </div>
            </div>
            <div className="flex justify-end mb-2">
              <Button className="px-6 py-2 bg-black hover:bg-gray-800 text-white">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
