import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

function PrivateRoute(props) {
  // Redirect to /login if anonymous user
  //check if user is logged in
  let userId = Local.getUserId();
  //if not redirect to login page
  if (!userId) {
    return <Navigate to="/login" />;
  }

  // Render child component(s)
  return <>{props.children}</>;
}

export default PrivateRoute;
