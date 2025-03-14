import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home"
import Register from "../components/Register";
import Login from "../components/Login";

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
        element:<h1>Cart Page</h1>
      },
      {
        path:"/checkout",
        element:<h1>Check out</h1>
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/register",
        element: <Register />
      }
    ],
  },
]);

export default router;
