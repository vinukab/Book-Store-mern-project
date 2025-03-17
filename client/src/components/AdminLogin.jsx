import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import getBaseUrl from "../utils/baseUrl";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data; //access the data field in the HTTP response
      console.log(auth);
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Session expired. Please login again.");
          navigate("/");
        },3600*1000);
      }

      alert("Admin login successful");
      navigate("/dashboard");
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
      console.log("Login error:", error);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
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

      <div className=" h-[calc(100vh-160px)] flex justify-center items-center p-4">
        <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col">
            {/* Top section - Form header */}
            <div className="bg-black bg-opacity-90 text-white p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold flex items-center">
                <FaUserShield className="mr-3 text-yellow-500" /> Admin Login
              </h2>
            </div>

            {/* Bottom section - Form fields */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    className="block text-gray-800 text-xs font-semibold mb-1"
                    htmlFor="email"
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
                      placeholder="username"
                      required
                      className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                    />
                  </div>
                </div>

                {/* Password with visibility toggle */}
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-7 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black bg-white bg-opacity-90"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                      tabIndex="-1"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-xs" />
                      ) : (
                        <FaEye className="text-xs" />
                      )}
                    </button>
                  </div>
                </div>

                {message && (
                  <p className="text-red-500 text-xs italic">{message}</p>
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-300 shadow-md hover:scale-105 "
                  >
                    Login
                  </button>
                </div>
              </form>

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

export default AdminLogin;
