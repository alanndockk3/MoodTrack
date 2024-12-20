"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import useFeedbackStore from "@/store/useFeedbackStore";
import usePlaylistStore from "@/store/usePlaylistStore"
import FormSection from "@/components/FormSection";
import PlaylistList from "@/components/PlaylistList";
import CircularProgressBar from "@/components/CircularProgressBar"


export default function DashboardPage() {
  const { likePlaylist } = usePlaylistStore();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setLoading(true);
    try {
      const response = await await fetch(`${apiUrl}/recommend`, {
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
    } finally {
      setLoading(false);
    }
  };


  // Handle user feedback (like/dislike)
  const handleFeedback = async (playlist, feedbackType) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        console.log(`Sending feedback: ${feedbackType} for`, playlist);
  
        if (feedbackType === "like") {
          await likePlaylist({
            name: playlist.name,
            description: playlist.description,
            url: playlist.url,
          });
        }
  
        // Remove playlist from recommendations
        setRecommendations((prev) =>
          prev.filter((item) => item.name !== playlist.name)
        );
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
        loading={loading}
        progress={progress}
      />
    </div>
  );
}
