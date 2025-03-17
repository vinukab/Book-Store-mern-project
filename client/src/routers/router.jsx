import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import CartPage from "../pages/books/CartPage";
import CheckOutPage from "../pages/books/CheckOutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./privateroute";
import Order from "../pages/books/OrderPage";
import AdminRoute from "./adminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBook from "../pages/dashboard/manageBooks/ManageBook";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, //acts as the base component for all routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <h1>About us</h1>,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/admin",
        element:<AdminLogin/>
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashboardLayout/>
          </AdminRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "add-new-book",
            element: (
              <AdminRoute>
                <AddBook/>
              </AdminRoute>
            ),
          },
          {
            path: "edit-book/:id",
            element: (
              <AdminRoute>
                <UpdateBook/>
              </AdminRoute>
            ),
          },
          {
            path: "manage-books",
            element: (
              <AdminRoute>
                <ManageBook/>
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
