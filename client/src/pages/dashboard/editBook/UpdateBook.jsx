import React, { use, useEffect } from "react";
import InputField from "../addBook/InputField";
import SelectField from "../addBook/SelectField";
import LoadingComponent from "../../../components/Loading";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchSingleBookQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError,refetch } = useFetchSingleBookQuery(id);
  const [UpdateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("description", book.description);
      setValue("category", book.category);
      setValue("oldPrice", book.oldPrice);
      setValue("newPrice", book.newPrice);
      setValue("coverImage", book.coverImage);
      setValue("trending", book.trending);
    }
  }, [book, setValue]);

  const onSubmit = async (data) => {
    const updatedBook = {
        title: data.title,
        description: data.description,
        category: data.category,
        oldPrice: data.oldPrice,
        newPrice: data.newPrice,
        coverImage: data.coverImage || book.coverImage,
        trending: data.trending,
    };
    try{
       await UpdateBook({ id, ...updatedBook }).unwrap();
       Swal.fire({
         title: "Book Updated",
         text: "Your book is updated successfully!",
         icon: "success",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, It's Okay!",
       });
       
       await refetch();
    }catch(err){
        alert("Error updating book");
        console.log(err);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
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
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
