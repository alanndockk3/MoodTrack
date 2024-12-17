"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import DropdownField from "@/components/DropdownField";
import PlaylistCard from "@/components/PlaylistCard";
import { title } from "@/components/primitives";
import { getAuth } from "firebase/auth";
import useFeedbackStore from "@/store/useFeedbackStore";

export default function DashboardPage() {
  const { addFeedback } = useFeedbackStore();
  const [recommendations, setRecommendations] = useState([]);
  const [formData, setFormData] = useState({
    energy: "",
    genre: "",
    preference: "",
    feeling: "",
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
      setRecommendations((prev) => [...prev, data]);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Left Section: Discover Playlists */}
      <section className="bg-content1 p-8 rounded-lg shadow-lg h-fit">
        <h1 className={`${title()} text-center`}>Discover Playlists</h1>

        <div className="flex flex-col gap-6 mt-5">
          <DropdownField
            label="Energy Level"
            options={["Low", "Moderate", "High"]}
            onSelect={(value) => handleSelect("energy", value)}
          />
          <DropdownField
            label="Genre"
            options={["Pop", "Rock", "Jazz"]}
            onSelect={(value) => handleSelect("genre", value)}
          />
          <DropdownField
            label="Preference"
            options={["Vocals", "Instrumental"]}
            onSelect={(value) => handleSelect("preference", value)}
          />
          <DropdownField
            label="Feeling"
            options={["Relaxed", "Happy", "Sad", "Excited"]}
            onSelect={(value) => handleSelect("feeling", value)}
          />
        </div>

        <Button
          onClick={fetchRecommendation}
          color="primary"
          className="w-full mt-6"
        >
          Discover Playlists
        </Button>
      </section>

      {/* Right Section: Playlist Cards */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">Your Playlists</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((playlist, index) => (
              <PlaylistCard
                key={index}
                name={playlist.name}
                description={playlist.description}
                url={playlist.url}
                onLike={() => handleFeedback(playlist.name, "like")}
                onDislike={() => handleFeedback(playlist.name, "dislike")}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No playlists to display yet.
          </p>
        )}
      </section>
    </div>
  );
}
