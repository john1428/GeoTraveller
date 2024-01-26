import React, { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isUserVerified } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    if (!isUserVerified) navigate("/");
  });

  return isUserVerified ? children : null;
  return <div></div>;
}

export default ProtectedRoute;
