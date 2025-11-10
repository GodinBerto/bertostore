"use client";
import { useState } from "react";

export default function SlantedLinesBackground({
  lineColor = "#e4e4e4",
  hoverColor = "blue",
  angle = -30,
  spacing = 1,
  thickness = 0.2,
  className = "absolute inset-0 pointer-events-none",
  hover = false,
  setHover,
}: SlantedLinesBackgroundProps) {
  //   const [hover, setHover] = useState(false);

  return (
    <div
      className={className}
      //   onMouseEnter={() => {
      //     setHover(true);
      //     console.log("hovered");
      //   }}
      //   onMouseLeave={() => setHover(false)}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diagonal-lines"
            patternUnits="userSpaceOnUse"
            width={spacing}
            height={spacing}
            patternTransform={`rotate(${angle})`}
          >
            <rect
              x="0"
              y="0"
              width={thickness}
              height={spacing}
              fill={hover ? hoverColor : lineColor}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>
    </div>
  );
}
