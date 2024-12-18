"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import useFeedbackStore from "@/store/useFeedbackStore";
import FormSection from "@/components/FormSection";
import PlaylistList from "@/components/PlaylistList";

export default function DashboardPage() {
  const { addFeedback } = useFeedbackStore();
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    feeling: "",
    energy: "",
    genre: "",
    timeFrame: "",
    popularity: "",
    alignMood: "Yes",
    activity: "",
  });

  // Fetch playlist recommendations
  const fetchRecommendation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        // Spread the array into recommendations
        setRecommendations((prev) => [...prev, ...data]);
      } else {
        console.error("Invalid data format received:", data);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };


  // Handle user feedback (like/dislike)
  const handleFeedback = async (playlistName, feedbackType) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser; // Fetch current user
      if (user) {
        const userId = user.uid;
        console.log(`Sending feedback: ${feedbackType} for ${playlistName}`);
        await addFeedback(playlistName, feedbackType, userId);

        // Remove playlist from recommendations
        setRecommendations((prev) =>
          prev.filter((playlist) => playlist.name !== playlistName)
        );

        // Reset formData
        setFormData({
          feeling: "",
          energy: "",
          genre: "",
          timeFrame: "",
          popularity: "",
          alignMood: "Yes",
          activity: "",
        });
      } else {
        console.error("No authenticated user. Please log in.");
      }
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 no-scrollbar">
      {/* Left Section: Discover Playlists */}
      <FormSection
        formData={formData}
        handleSelect={handleSelect}
        fetchRecommendation={fetchRecommendation}
      />

      {/* Right Section: Playlist Cards */}
      <PlaylistList
        recommendations={recommendations}
        handleFeedback={handleFeedback}
      />
    </div>
  );
}
