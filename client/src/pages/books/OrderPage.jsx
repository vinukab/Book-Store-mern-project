import React from "react";
import { useFetchOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import LoadingComponent from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useFetchOrderByEmailQuery(currentUser.email);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 sm:p-6 text-red-600 font-medium text-center">
        Error fetching order's data
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white">
      <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 font-bold text-black border-b-2 border-black">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded-md text-black border border-yellow-500 text-center">
          No Orders Found!
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="border-l-4  border-t border-r border-b border-gray-700 rounded-lg shadow-sm p-4 sm:p-6 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-2 border-b border-gray-200">
                <h2 className="font-bold text-lg sm:text-xl text-black mb-2 sm:mb-0">
                  Order ID:{" "}
                  <span className="font-normal text-gray-700 text-sm sm:text-base break-all">
                    {order._id}
                  </span>
                </h2>
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm self-start sm:self-auto">
                  $ {order.totalPrice}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-semibold text-black">Name:</span>{" "}
                    {order.name}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-semibold text-black">Email:</span>{" "}
                    {order.email}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    <span className="font-semibold text-black">Phone:</span>{" "}
                    {order.phone}
                  </p>
                </div>

                <div className=" p-3 rounded-md ">
                  <h3 className="font-semibold text-black mb-1">Address:</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-black mb-2">
                  Ordered Products:
                </h3>
                <ul className="bg-gray-50 rounded-md p-2 max-h-48 overflow-y-auto">
                  {order.productsId.map((product) => (
                    <li
                      key={product._id}
                      className="py-2 px-3 border-b border-gray-100 last:border-b-0 text-sm sm:text-base "
                    >
                      <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
                      {product.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
