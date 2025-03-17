import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";

const AddBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data) => {
    console.log(data);
    const newBook = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBook).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book added successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
      setImageFile(null);
      setImageFileName("");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center border-b-2 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Add New Book</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              label="Title"
              name="title"
              placeholder="Enter book title"
              register={register}
              errors={errors}
            />

            <SelectField
              label="Category"
              name="category"
              options={[
                { value: "", label: "Choose A Category" },
                { value: "business", label: "Business" },
                { value: "technology", label: "Technology" },
                { value: "fiction", label: "Fiction" },
                { value: "horror", label: "Horror" },
                { value: "adventure", label: "Adventure" },
              ]}
              register={register}
              errors={errors}
            />

            <div className="grid grid-span-2 gap-2">
              <InputField
                label="Old Price"
                name="oldPrice"
                type="number"
                placeholder="Old Price"
                register={register}
                errors={errors}
              />

              <InputField
                label="New Price"
                name="newPrice"
                type="number"
                placeholder="New Price"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div>
            <InputField
              label="Description"
              name="description"
              placeholder="Enter book description"
              type="textarea"
              register={register}
              errors={errors}
            />

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {imageFileName && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {imageFileName}
                </p>
              )}
            </div>

            <div className="mt-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register("trending")}
                  className="rounded text-black focus:ring-2 focus:ring-offset-2  h-5 w-5"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Mark as Trending
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-yellow-500  text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Book...
              </span>
            ) : (
              <span>Add Book</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
