import type {JSX} from "react";
import type {IconProps} from "../../../types/commonTypes.ts";

export default function CloseIcon({
  size = 24,
  color = "currentColor",
  title = "Close icon",
  className,
  backgroundColor: _backgroundColor,
  ...props
}: IconProps): JSX.Element {
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
      <path
        d="M18 6L6 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
