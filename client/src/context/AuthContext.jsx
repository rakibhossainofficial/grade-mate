import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import useAxiosInstance from "@/hooks/useAxiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      try {
        await axiosInstance.post("/login", {
          userUID: firebaseUser.uid,
          userEmail: firebaseUser.email,
        });
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [axiosInstance]);

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Create new user
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Update profile (displayName, photoURL)
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) throw new Error("No user is signed in");
    await updateProfile(auth.currentUser, profile);
    setUser({ ...auth.currentUser });
  };

  // Google Login
  const googleLogin = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    setAuthLoading(false);
    return result.user;
  };

  // Logout
  const logout = () => signOut(auth);

  const value = {
    user,
    authLoading,
    login,
    createUser,
    updateUserProfile,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
}
