import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                <FaSignInAlt className="mr-2" /> Login
              </h2>
              <p className="mt-2 text-gray-400 text-sm hidden md:block">
                Welcome back to your literary journey
              </p>
              <div className="hidden md:block mt-6">
                <p className="text-sm text-gray-400">Don't have an account?</p>
                <Link
                  to="/register"
                  className="text-white font-medium hover:text-yellow-500"
                >
                  Register here
                </Link>
              </div>
            </div>

            {/* Right side - Form fields */}
            <div className="p-4 md:p-6 md:w-2/3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      required
                      className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                    />
                  </div>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                    />
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <input
                      {...register("remember-me", { required: true })}
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-3 h-3 text-gray-900 border-gray-300 rounded focus:ring-gray-700"
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-1.5 text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="font-medium text-gray-800 hover:text-black"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                {message && (
                  <p className="text-red-500 text-xs italic">{message}</p>
                )}

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-300 shadow-md flex-1 hover:scale-105"
                  >
                    Sign In
                  </button>

                  <button
                    type="button"
                    className="flex justify-center items-center bg-white border border-gray-300 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-300 shadow-sm flex-1 hover:scale-105"
                  >
                    <FaGoogle className="text-red-600 mr-2 text-sm" />
                    Sign in with Google
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-700 md:hidden">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-gray-800 hover:text-black"
                  >
                    Register
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

export default Login;
