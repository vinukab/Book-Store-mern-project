import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./redux/store.js"; 
import "sweetalert2/dist/sweetalert2.js";

// './' refers to the current directory. which is src in this context
// '../' refers to the parent directory(one level up). which is client in this context
import router from './routers/router.jsx' 

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)