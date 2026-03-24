import type {JSX} from "react";
import type {IconProps} from "../../../types/commonTypes.ts";

type ChevronDirection = "up" | "down" | "left" | "right";

const chevronPointsByDirection: Record<ChevronDirection, string> = {
  up: "6 15 12 9 18 15",
  down: "6 9 12 15 18 9",
  left: "15 18 9 12 15 6",
  right: "9 18 15 12 9 6",
};

export default function ChevronIcon({
  direction = "right",
  size = 24,
  color = "currentColor",
  title = "Chevron icon",
  className,
  backgroundColor: _backgroundColor,
  ...props
}: IconProps & {
  direction?: ChevronDirection;
}): JSX.Element {
  void _backgroundColor;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      {...props}
    >
      <title>{title}</title>
      <polyline
        points={chevronPointsByDirection[direction]}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
