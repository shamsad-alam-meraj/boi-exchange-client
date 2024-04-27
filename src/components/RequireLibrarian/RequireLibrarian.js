import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Navigate } from "react-router-dom";
import auth from "../../firebase.init";
import useLibrarian from "../../hooks/useLibrarian";
import Loading from "../Loading/Loading";

const RequireLibrarian = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [librarian, librarianLoading] = useLibrarian(user);
  let location = useLocation();
  if (loading || librarianLoading) {
    return <Loading></Loading>;
  }
  if (!user || !librarian) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireLibrarian;
