import type {JSX} from "react";
import type {IconProps} from "../../../types/commonTypes.ts";

export default function CheckIcon({
  size = 24,
  color = "currentColor",
  title = "Check icon",
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
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
