import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { currentUser,loading } = useAuth();

  if (loading){
    return <LoadingComponent/>
  }
  if (currentUser) {
    return children;
  }
  // with replace the history stack will not be updated
  // so if the user clicks back button it will not go to protected route
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
