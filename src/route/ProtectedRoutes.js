import { Navigate, Outlet } from "react-router-dom";
import { firebase } from "../firebase-config";
const useAuth = () => {
  const user = firebase.auth().currentUser;
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
