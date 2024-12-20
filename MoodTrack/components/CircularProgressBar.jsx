import React from "react";

const CircularProgressBar = ({ progress }) => {
  const circleRadius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * circleRadius; // Circumference of the circle
  const offset = circumference - (progress / 100) * circumference; // Offset based on progress

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Outer Circle */}
      <svg
        className="transform rotate-[-90deg]"
        width="100"
        height="100"
        viewBox="0 0 120 120"
      >
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#2c2f36"
          strokeWidth="10"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="#f59e0b" // Orange color
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {/* Center Text */}
      <span className="absolute text-white text-lg font-bold">
        {progress}%
      </span>
    </div>
  );
};

export default CircularProgressBar;
