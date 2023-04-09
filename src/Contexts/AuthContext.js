import { getAuth } from "firebase/auth";
import { createContext, useReducer, useEffect, useContext } from "react";
import { app } from "../Firebase/firebase";
import { InitialState, auth_reducer } from "../Reducer/authReducer";

const AuthContext = createContext({
  user: 'junior',
  login: () => {},
  logout: () => {},
});



const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, InitialState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    let user = sessionStorage.getItem("user") || localStorage.getItem("user");

    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
    
    if(!user){
      user = getAuth(app).currentUser
      dispatch({ type: "LOGIN", payload: user });
    }

  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthStateContext() {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider };
