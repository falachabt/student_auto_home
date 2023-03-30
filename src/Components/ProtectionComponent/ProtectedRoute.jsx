import { Navigate } from "react-router-dom";
import { AuthStateContext } from "../../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = AuthStateContext();

  return <>{user ? children : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
