"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { CiUser, CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { Dropdown } from "flowbite-react";
import { useAuth } from "../context/AuthContext";
import AvatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { currentUser, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  const cartItems = useSelector((state) => state.cart.cartItems);


  
  return (
    <header className="max-w-screen-2xl mx-auto px-9 py-6 pr-10">
      <nav className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10">
          <Link to="/">
            <FaBars className="size-5 sm:size-6 md:size-7" />
          </Link>

          <div className="flex items-center bg-[#EAEAEA] rounded-md w-32 sm:w-48 md:w-64 lg:w-72 xl:w-80 px-3">
            <IoSearch className="text-gray-500 text-sm sm:text-base" />

            <input
              type="text"
              placeholder="Search here"
              className="bg-transparent w-full py-2 px-2 focus:outline-none text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          {/* User Dropdown */}
          {currentUser ? (
            <Dropdown
              inline
              arrowIcon={false}
              className="rounded-lg shadow-lg border border-gray-200 w-64 p-3 "
              label={
                <img
                  src={AvatarImg}
                  alt="User Avatar"
                  className="rounded-full  ring-2 ring-blue-500 cursor-pointer size-6 md:size-8"
                />
              }
            >
              <Dropdown.Item
                href="/dashboard"
                className="hover:bg-gray-100 rounded-lg"
              >
                Dashboard
              </Dropdown.Item>

              <Dropdown.Item
                href="/orders"
                className="hover:bg-gray-100 rounded-lg"
              >
                Orders
              </Dropdown.Item>
              <Dropdown.Divider />

              <Link to="/cart">
                <Dropdown.Item className="hover:bg-gray-100 rounded-lg">
                  Cart Page
                </Dropdown.Item>
              </Link>

              <Link to="/checkout">
                <Dropdown.Item className="hover:bg-gray-100 rounded-lg">
                  Check Out
                </Dropdown.Item>
              </Link>

              <Link to="/">
                <Dropdown.Item
                  className="hover:bg-gray-100 rounded-lg"
                  onClick={handleLogOut}
                >
                  Logout
                </Dropdown.Item>
              </Link>

            </Dropdown>
          ) : (
            <Link to="/login">
              <CiUser className="size-6 md:size-8" />
            </Link>
          )}

          {/* Wishlist Icon */}
          <button className="hidden sm:block">
            <CiHeart className="size-6 md:size-8" />
          </button>

          {/* Cart Icon */}
          <div className="relative">
            <Link
              to="/cart"
              className="p-1 sm:px-4 px-2 flex justify- center items-center rounded-lg  bg-black text-white"
            >
              <GiShoppingCart className="size-5 md:size-8" />
              {cartItems.length > 0 ? (
                <span className="sm:text-sm text-xs font-semibold sm:ml-2 ml-1 ">
                  {cartItems.length}
                </span>
              ) : (
                <span className="sm:text-sm text-xs font-semibold sm:ml-2 ml-1">
                  0
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
