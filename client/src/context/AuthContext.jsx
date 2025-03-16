import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

// createContext() creates the context object.
// AuthProvider provides the dynamic data through the context.
// useAuth() is a custom hook to access that data easily in any component.

//custom hook that accesses the context values provided by AuthProvider
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  //create a new user with email and password
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in an existing user with email and password
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //sign in with Google
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //sign out the current user
  const logOut = async () => {
    return await signOut(auth);
  };

  //manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const { email, displayName, imgURL } = user;
        const userData = {
          email,
          usernama: displayName,
          photo: imgURL,
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
