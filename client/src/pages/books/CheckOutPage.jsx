import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import LoadingComponent from "../../components/Loading";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi"; // Corrected import
import getBaseUrl from "../../utils/baseUrl";
import Swal from "sweetalert2";

const CheckOutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data); // Log the form data
    const newOrder = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      productsId: cartItems.map((item) => item._id),
      totalPrice: totalPrice,
    };
    try {
      await createOrder(newOrder).unwrap();

      Swal.fire({
        title: "Confirm Order",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm order!",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("failed to place order");
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="min-h-[100vh] p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Cash On Delivery
              </h2>
              <div className="flex space-x-8">
                <p className="text-gray-500 mb-2">
                  Total Price:{" "}
                  <span className="font-medium">${totalPrice}</span>
                </p>
                <p className="text-gray-500 mb-2">
                  Num of items:{" "}
                  <span className="font-medium">
                    {cartItems.length > 0 ? cartItems.length : 0}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-6 md:p-8 mb-6">
              <form
                className="text-sm grid gap-4 gap-y-2 grid-cols-1 lg:grid-cols-3 my-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p className="mt-2 text-gray-500">
                    Please fill out all the fields.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-6 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label
                        htmlFor="full_name"
                        className="block text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        id="name"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        {...register("email", { required: true })}
                        type="text"
                        id="email"
                        name="email"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                        placeholder="email@domain.com"
                        defaultValue={currentUser?.email}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        id="phone"
                        name="phone"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                        placeholder="+1234567890"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 mb-1"
                      >
                        Address/ Street
                      </label>
                      <input
                        {...register("address", { required: true })}
                        id="address"
                        name="address"
                        type="text"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-gray-700 mb-1"
                      >
                        City
                      </label>
                      <input
                        {...register("city", { required: true })}
                        id="city"
                        name="city"
                        type="text"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-gray-700 mb-1"
                      >
                        Country / region
                      </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-300 rounded items-center mt-1 overflow-hidden">
                        <input
                          {...register("country", { required: true })}
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600 px-2"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600 px-2"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-gray-700 mb-1"
                      >
                        State / province
                      </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-300 rounded items-center mt-1 overflow-hidden">
                        <input
                          {...register("state", { required: true })}
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        />
                        <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600 px-2">
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          tabIndex="-1"
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600 px-2"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label
                        htmlFor="zipcode"
                        className="block text-gray-700 mb-1"
                      >
                        Zipcode
                      </label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="h-10 border border-gray-300 mt-1 rounded px-4 w-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-5 mt-2">
                      <div className="inline-flex items-center">
                        <input
                          {...register("agree", { required: true })}
                          type="checkbox"
                          id="agree"
                          name="agree"
                          className="form-checkbox h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          onChange={() => setIsChecked(!isChecked)} // Manage isChecked state
                        />
                        <label htmlFor="agree" className="ml-2 text-gray-700">
                          I agree to the{" "}
                          <Link className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                            Shopping policy.
                          </Link>
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-5 text-right mt-4">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-primary hover:scale-105 text-white font-bold py-2 px-6 rounded transition-all duration-200 shadow-sm"
                          disabled={!isChecked}
                        >
                          Place an Order{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
