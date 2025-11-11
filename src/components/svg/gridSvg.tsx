"use client";

export default function GridCellSVG({
  lineColor = "#e4e4e4",
  hoverColor = "blue",
  angle = -30,
  spacing = 0.05, // must be between 0–1
  thickness = 0.005, // must be between 0–1
  className = "absolute inset-0 pointer-events-none",
  hover = false,
}: SlantedLinesBackgroundProps) {
  return (
    <div className={className}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="diagonal-lines"
            patternUnits="objectBoundingBox"
            width={spacing}
            height={spacing}
            patternTransform={`rotate(${angle})`}
          >
            <rect
              x="0"
              y="0"
              width={thickness}
              height="1"
              fill={hover ? hoverColor : lineColor}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>
    </div>
  );
}
