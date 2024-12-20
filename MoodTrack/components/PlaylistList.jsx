import React from "react";
import PlaylistCard from "@/components/PlaylistCard";
import CircularProgressBar from "@/components/CircularProgressBar";

const PlaylistList = ({ recommendations, handleFeedback, loading, progress }) => {
  return (
    <section
      className="
      bg-content1 p-4 rounded-lg overflow-hidden flex flex-col 
      shadow-md dark:shadow-lg border border-gray-300 dark:border-0"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center">Your Playlists</h2>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <CircularProgressBar progress={progress} />
          <p className="mt-4 text-gray-500">Loading recommendations...</p>
        </div>
      ) : (
        <div
          className="
            flex-1 overflow-y-auto max-h-[500px] px-2 scrollbar scrollbar-thin 
            scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
        >
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((playlist, index) => (
                <PlaylistCard
                  key={index}
                  name={playlist.name}
                  description={playlist.description}
                  url={playlist.url}
                  onLike={() => handleFeedback(playlist, "like")}
                  onDislike={() => handleFeedback(playlist, "dislike")}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No playlists to display yet.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default PlaylistList;
