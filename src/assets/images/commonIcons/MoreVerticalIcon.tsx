import type {JSX} from "react";
import type {IconProps} from "../../../types/commonTypes.ts";

export default function MoreVerticalIcon({
  size = 24,
  color = "currentColor",
  title = "More actions icon",
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
      <circle cx="12" cy="5" r="2" fill={color} />
      <circle cx="12" cy="12" r="2" fill={color} />
      <circle cx="12" cy="19" r="2" fill={color} />
    </svg>
  );
}
