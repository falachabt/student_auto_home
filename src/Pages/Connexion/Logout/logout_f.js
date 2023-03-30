import { toast } from "react-toastify";
import { auth } from "../../../Firebase/firebase";

export const logout_func = (dispatch, hideBoxFunc) => {
  const signOut = require("firebase/auth").signOut;
  signOut(auth)
    .then(() => {
      hideBoxFunc("logout", false);
      dispatch({ type: "LOGOUT" });
    })
    .catch((err) => {
      toast.error("Failed something went wrong", {
        toastId: "errorlogout",
        containterId: "1",
        autoClose: false,
      });
    });
};
