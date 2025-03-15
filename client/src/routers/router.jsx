import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home"
import Register from "../components/Register";
import Login from "../components/Login";
import CartPage from "../pages/books/CartPage";
import CheckOutPage from "../pages/books/CheckOutPage";
import SingleBook from "../pages/books/SingleBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/orders",
        element: <h1>Orders</h1>,
      },
      {
        path: "/about",
        element: <h1>About us</h1>,
      },{
        path:"/cart",
        element:<CartPage />
      },
      {
        path:"/checkout",
        element:<CheckOutPage />  
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/register",
        element: <Register />
      },
      {
        path:"/books/:id",
        element:<SingleBook />
      }
    ],
  },
]);

export default router;
