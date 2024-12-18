"use client";

import PlaylistCard from "@/components/PlaylistCard";

const PlaylistList = ({ recommendations, handleFeedback }) => {
  return (
      <section
        className="
          flex flex-col gap-6 bg-content1 p-4 rounded-lg 
          shadow-md dark:shadow-lg border border-gray-100 dark:border-0"
     >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center">Your Playlists</h2>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto max-h-[500px] px-2 scrollbar scrollbar-thin 
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
                onLike={() => handleFeedback(playlist.name, "like")}
                onDislike={() => handleFeedback(playlist.name, "dislike")}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No playlists to display yet.</p>
        )}
      </div>
    </section>

  );
};

export default PlaylistList;
