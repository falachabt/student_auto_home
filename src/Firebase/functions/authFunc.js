import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

/**
 * Cette fonction crée un nouvel compte utilisateur.
 *
 * @param {string} email - l'email de l'utilisateur.
 * @param {string} password - le mot de passe de l'utilisateur.
 * @param {object} stateChanger - changeState function 
 * @param {string} stateParams - la clé de l'objet a changer 
 */

export const createUser_email_password = async ({
  email = "",
  password = "",
  stateChanger,
  stateParams = "add_auth",
}) => {
  if (email && password && auth) {
    
    const prevUser = auth.currentUser;

    stateChanger && stateChanger((prev) => {
      return { ...prev, [stateParams]: true };
    });
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
    
        updateProfile(userCredential.user, { displayName: password }).then(
          () => {
           
            signOut(auth).then(() => {
              
              signInWithEmailAndPassword(
                auth,
                prevUser.email,
                prevUser.displayName
              ).then(() => {
                
               stateChanger &&  stateChanger((prev) => {
                  return { ...prev, [stateParams]: false };
                });
              });
            });
          }
        );
      })
      .catch((err) => {
        toast.error("failed", { containerId: "1" });
      });
  } else {
    if (!email || !password) {
      toast.error("invalid information", { containerId: "1" });
    } else {
      toast.error("acces required", { containerId: "1" });
    }
  }
};
