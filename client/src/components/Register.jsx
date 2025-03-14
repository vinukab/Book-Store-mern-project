import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {/* Full-screen background div that sits behind everything */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/bg-img2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="max-w-3xl w-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form header */}
            <div className="bg-black bg-opacity-90 text-white p-4 md:p-6 md:w-1/3 flex flex-col justify-center">
              <h2 className="text-xl font-bold flex items-center justify-center md:justify-start">
                <FaUserPlus className="mr-2" /> Create Account
              </h2>
              <p className="mt-2 text-gray-400 text-sm hidden md:block">
                Join our community and explore thousands of books
              </p>
              <div className="hidden md:block mt-6">
                <p className="text-sm text-gray-400">Already registered?</p>
                <Link
                  to="/login"
                  className="text-white font-medium hover:text-yellow-500"
                >
                  Sign in here
                </Link>
              </div>
            </div>

            {/* Right side - Form fields */}
            <div className="p-4 md:p-6 md:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-gray-800 text-xs font-semibold mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500 text-xs" />
                      </div>
                      <input
                        {...register("fullName", { required: true })}
                        placeholder="John Doe"
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-gray-800 text-xs font-semibold mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-500 text-xs" />
                      </div>
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@example.com"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label
                      className="block text-gray-800 text-xs font-semibold mb-1"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500 text-xs" />
                      </div>
                      <input
                        {...register("username", { required: true })}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username123"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-800 text-xs font-semibold mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500 text-xs" />
                      </div>
                      <input
                        {...register("password", { required: true })}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-800 text-xs font-semibold mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500 text-xs" />
                      </div>
                      <input
                        {...register("confirmPassword", { required: true })}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        type="password"
                        className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>
                </div>

                {message && (
                  <p className="text-red-500 text-xs italic">{message}</p>
                )}

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                  <button className="bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-300 shadow-md flex-1 hover:scale-105">
                    Create Account
                  </button>

                  <button
                    type="button"
                    className="flex justify-center items-center bg-white border border-gray-300 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-300 shadow-sm flex-1 hover:scale-105"
                  >
                    <FaGoogle className="text-red-600 mr-2 text-sm" />
                    Sign up with Google
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-700 md:hidden">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-gray-800 hover:text-black"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <p className="text-xs mt-4 text-center text-gray-700">
                &copy; 2025 Book Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
