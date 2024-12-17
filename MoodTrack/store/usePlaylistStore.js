import { create } from "zustand";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

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
      const likedRef = collection(db, "playlists");
      await addDoc(likedRef, {
        name: playlist.name,
        description: playlist.description,
        url: playlist.url,
        liked_at: new Date(),
      });

      set((state) => ({
        likedPlaylists: [...state.likedPlaylists, playlist],
        recommendations: state.recommendations.filter(
          (item) => item.name !== playlist.name
        ),
      }));
    } catch (error) {
      console.error("Error adding playlist to Firestore:", error);
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
}));

export default usePlaylistStore;