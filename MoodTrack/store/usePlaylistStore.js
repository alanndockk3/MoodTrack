import { create } from "zustand";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc , query, where} from "firebase/firestore";

const usePlaylistStore = create((set, get) => ({
  recommendations: [], // List of recommended playlists
  likedPlaylists: [], // List of playlists the user liked

  // Fetch playlists from the server
  fetchPlaylists: async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Ensure the data is an array
      const playlists = Array.isArray(data) ? data : [];
      console.log("Fetched playlists:", playlists);

      set({ recommendations: playlists });
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  },

  // Add playlist to the liked collection
  likePlaylist: async (playlist) => {
    try {
      const user = auth.currentUser; // Get authenticated user
      if (!user) {
        throw new Error("User is not authenticated");
      }

      // Prepare the data object with all necessary fields
      const data = {
        user_id: user.uid,
        playlist_name: playlist.name,
        description: playlist.description,
        url: playlist.url,
        timestamp: new Date(),
      };

      const playlistsRef = collection(db, "playlists");
      await addDoc(playlistsRef, data);

      set((state) => ({
        likedPlaylists: [...state.likedPlaylists, data],
      }));
      console.log("Playlist successfully saved:", data);
    } catch (error) {
      console.error("Error in likePlaylist:", error.message);
      throw error; // Ensure errors propagate for visibility
    }
  },
  

  // Remove disliked playlists
  dislikePlaylist: (playlist) => {
    set((state) => ({
      recommendations: state.recommendations.filter(
        (item) => item.name !== playlist.name
      ),
    }));
  },

  // Fetch liked playlists from Firestore
  fetchLikedPlaylists: async () => {
    try {
      // Check if user is authenticated
      const user = auth.currentUser;
  
      if (!user) {
        console.error("User is not authenticated. Please log in.");
        return;
      }
  
      // Reference the 'playlists' collection and filter by user_id
      const likedRef = collection(db, "playlists");
      const q = query(likedRef, where("user_id", "==", user.uid));
  
      console.log("Fetching playlists for user_id:", user.uid);
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.warn("No playlists found for user.");
        set({ likedPlaylists: [] });
        return;
      }
  
      // Map documents to the likedPlaylists array
      const likedPlaylists = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched liked playlists:", likedPlaylists);
  
      set({ likedPlaylists });
    } catch (error) {
      console.error("Error fetching liked playlists:", error);
    }
  },
  // Remove liked playlist from Firestore and state
  removeLikedPlaylist: async (playlistId) => {
    try {
      const playlistRef = doc(db, "playlists", playlistId);
      await deleteDoc(playlistRef);

      set((state) => ({
        likedPlaylists: state.likedPlaylists.filter(
          (playlist) => playlist.id !== playlistId
        ),
      }));
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  },
}));

export default usePlaylistStore;
