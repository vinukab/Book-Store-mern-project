import React from "react";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/CartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const dispatch = useDispatch();
  const handleclearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <>
      <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl border border-gray-200 rounded-lg">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="text-xl font-bold text-black">Cart Overview</div>
            <div className="flex items-center">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
                onClick={() => {
                  handleclearCart();
                }}
              >
                <span className="flex items-center justify-center">
                  Clear Cart <FaRegTrashAlt className="ml-2" />
                </span>
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="mt-8">
            <div className="flow-root">
              {cartItems.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item?._id} className="flex py-6">
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                        <img
                          alt="Product"
                          src={`${getImgUrl(item?.coverImage)}`}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-wrap justify-between text-base font-medium text-black">
                            <h3 className="text-lg hover:underline">
                              <Link to="/">{item?.title}</Link>
                            </h3>
                            <p className="sm:ml-4 font-bold">
                              {item?.newPrice}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 font-semibold">
                            Category :
                            <span className=" text-gray-800 text-xs px-2 py-0.5 rounded-full">
                              {item?.category}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-1 flex-wrap items-end justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button className="px-3 py-1 text-black hover:bg-gray-100">
                              <FaMinus size={10} />
                            </button>
                            <span className="px-4 py-1 text-black font-medium border-x border-gray-300">
                              1
                            </span>
                            <button className="px-3 py-1 text-black hover:bg-gray-100">
                              <FaPlus size={10} />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-red-500 hover:text-red-600 underline-offset-2 hover:underline transition-colors"
                              onClick={() => {
                                handleRemoveFromCart(item);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items added to the cart!</p>
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="border-t border-gray-300 bg-gray-50 px-4 py-6 sm:px-6">
          <div className="pt-2  border-gray-200 flex justify-between font-bold text-lg text-black">
            <p>Subtotal</p>
            <p>${totalPrice ? totalPrice : 0}</p>
          </div>
          <p className="text-xs mt-1">
            Shipping and taxes calculated at checkout
          </p>

          <div>
            <Link to="/checkout">
              <button className="mt-4 w-full bg-black text-base font-medium text-white shadow-sm hover:bg-gray-800 py-3 px-6 rounded transition-colors duration-200">
                Checkout
              </button>
            </Link>
          </div>

          <div className="flex justify-center items-center mt-6 text-sm text-gray-500">
            <Link to="/" className="flex items-center group">
              <span>or</span>
              <button
                type="button"
                className="ml-2 text-black group-hover:text-gray-700 font-medium"
              >
                Continue Shopping{" "}
                <span
                  aria-hidden="true"
                  className="group-hover:ml-1 transition-all duration-200"
                >
                  {" "}
                  &rarr;{" "}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
