import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
toast.configure();
const useFirebase = () => {
  const [user, setUser] = useState({});
  console.log(user);
  const auth = getAuth();

  // Showing notification after logout

  const notify = (type, msg) => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      notify("success", "Logout Successfull");
      setUser({});
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unsubscribe;
  }, [auth]);

  return {
    user,
    signInUsingGoogle,
    logOut,
    notify,
  };
};

export default useFirebase;
