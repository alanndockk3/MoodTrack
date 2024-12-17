import { create } from "zustand";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const useFeedbackStore = create(() => ({
  addFeedback: async (playlistName, feedbackType, userId) => {
    try {
      if (!playlistName || !feedbackType || !userId) {
        throw new Error("Invalid feedback data"); // Handle empty fields
      }

      const feedbackRef = collection(db, "playlist_feedback");
      const feedback = {
        user_id: userId,
        playlist_name: playlistName,
        feedback: feedbackType,
        timestamp: new Date(),
      };

      await addDoc(feedbackRef, feedback); // Add to Firestore
      console.log("Feedback successfully added:", feedback);
    } catch (error) {
      console.error("Error adding feedback:", error);
      throw error; // Re-throw error for debugging
    }
  },
}));

export default useFeedbackStore;
