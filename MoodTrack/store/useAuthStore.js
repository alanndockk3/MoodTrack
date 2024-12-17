import { create } from "zustand";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const useAuthStore = create((set) => ({
  user: null,
  error: null,

  // Set user function
  setUser: (user) => set({ user }),
  
  // Sign up function
  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add the user to the Firestore 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      set({ user, error: null });
    } catch (err) {
      console.error("Error signing up:", err.message);
      set({ error: err.message });
    }
  },

  // Log in function
  logIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, error: null });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // Log out function
  logOut: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (err) {
      set({ error: err.message });
    }
  },
}));

// Initialize the auth listener outside the store to avoid recreating it on every render
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({ user }); // Update Zustand store with the logged-in user
  } else {
    useAuthStore.setState({ user: null }); // Clear the user on logout
  }
});

export default useAuthStore;
