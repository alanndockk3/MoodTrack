"use client";

import { Select, SelectItem, Button } from "@nextui-org/react";

const FormSection = ({ formData, handleSelect, fetchRecommendation }) => {
  const options = {
    feelings: [
      { key: "relaxed", label: "Relaxed" },
      { key: "happy", label: "Happy" },
      { key: "sad", label: "Sad" },
      { key: "excited", label: "Excited" },
      { key: "angry", label: "Angry" },
      { key: "stressed", label: "Stressed" },
      { key: "romantic", label: "Romantic" },
      { key: "lonely", label: "Lonely" },
    ],
    energyLevels: [
      { key: "low", label: "Low" },
      { key: "moderate", label: "Moderate" },
      { key: "high", label: "High" },
    ],
    genres: [
      { key: "pop", label: "Pop" },
      { key: "rock", label: "Rock" },
      { key: "jazz", label: "Jazz" },
      { key: "electronic", label: "Electronic" },
      { key: "classical", label: "Classical" },
      { key: "folk", label: "Folk" },
      { key: "hip-hop", label: "Hip-Hop" },
      { key: "indie", label: "Indie" },
    ],
    timeFrames: [
      { key: "past_two_weeks", label: "Past two weeks" },
      { key: "1990s", label: "1990s" },
      { key: "2000s", label: "2000s" },
      { key: "2010s", label: "2010s" },
      { key: "any_time", label: "Any time" },
    ],
    popularity: [
      { key: "popular", label: "Popular" },
      { key: "hidden_gems", label: "Hidden Gems" },
    ],
    alignMood: [
      { key: "yes", label: "Yes" },
      { key: "no", label: "No" },
    ],
    activities: [
      { key: "workout", label: "Workout" },
      { key: "study", label: "Study" },
      { key: "relax", label: "Relax" },
      { key: "party", label: "Party" },
      { key: "none", label: "None" },
    ],
  };

  return (
    <section className="
                bg-content1 p-4 rounded-lg overflow-hidden flex flex-col 
                shadow-md dark:shadow-lg border border-gray-300 dark:border-0">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-4">Discover Playlists</h1>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto flex flex-col gap-4">
        {/* How are you feeling? */}
        <Select
          label="How are you feeling?"
          placeholder="Select your mood"
          selectedKeys={[formData.feeling]}
          onSelectionChange={(value) => handleSelect("feeling", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.feelings.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Preferred energy level */}
        <Select
          label="What’s your preferred energy level?"
          placeholder="Select energy level"
          selectedKeys={[formData.energy]}
          onSelectionChange={(value) => handleSelect("energy", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.energyLevels.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Genre */}
        <Select
          label="What genre do you want to explore?"
          placeholder="Select genre"
          selectedKeys={[formData.genre]}
          onSelectionChange={(value) => handleSelect("genre", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.genres.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Time Frame */}
        <Select
          label="When should the music feel fresh?"
          placeholder="Select time frame"
          selectedKeys={[formData.timeFrame]}
          onSelectionChange={(value) => handleSelect("timeFrame", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.timeFrames.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Popular or Hidden Gems */}
        <Select
          label="Are you looking for popular playlists or hidden gems?"
          placeholder="Select preference"
          selectedKeys={[formData.popularity]}
          onSelectionChange={(value) => handleSelect("popularity", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.popularity.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Align with Mood */}
        <Select
          label="Should the playlist align with your current mood?"
          placeholder="Select alignment"
          selectedKeys={[formData.alignMood]}
          onSelectionChange={(value) => handleSelect("alignMood", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.alignMood.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        {/* Curated Playlist for Specific Activity */}
        <Select
          label="Would you like a curated playlist for a specific activity?"
          placeholder="Select activity"
          selectedKeys={[formData.activity]}
          onSelectionChange={(value) => handleSelect("activity", value.currentKey)}
          classNames={{
            popoverContent:
              "max-h-60 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800",
          }}
        >
          {options.activities.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Button */}
      <Button
        onClick={fetchRecommendation}
        color="primary"
        className="w-full mt-8"
      >
        Discover Playlists
      </Button>
    </section>
  );
};

export default FormSection;
