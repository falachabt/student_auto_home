import { toast } from "react-toastify";
import { user_action } from "../../../Data/userAction";
import { auth } from "../../../Firebase/firebase";

export const signInFunciton = (formId, dispatch, navigate) => {
  const form = document.forms[formId];
  
  if (form) {
    

    const firebase_auth = require("firebase/auth");
    const email = form["email"];
    const password = form["password"];

    firebase_auth
      .signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        dispatch({ type: user_action.login, payload: user.user });
        toast.success(`welcome ${user.user.email}`, {
          containerId: "1",
          toastId: "welcome",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("connection failed", {
          containerId: "1",
          toastId: "failed",
          autoClose: false,
        });
        console.log(error);
      });
  }
};
