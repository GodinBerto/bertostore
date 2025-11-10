interface SlantedLinesBackgroundProps {
  lineColor?: string; // default: light gray
  hoverColor?: string; // default: red
  angle?: number; // default: -45 degrees
  spacing?: number; // distance between lines
  thickness?: number; // line thickness
  className?: string; // tailwind classes for layout (like absolute inset-0)
  hover?: boolean;
  setHover?: (value: boolean) => void;
}
