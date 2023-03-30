import { getAuth } from "firebase/auth";
import { app } from "../Firebase/firebase";

export const InitialState = {
  user:  getAuth(app).currentUser || JSON.parse(localStorage.getItem('user')),
};

export const auth_reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return;
  }
};
