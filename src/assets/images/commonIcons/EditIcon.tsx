import type {JSX} from "react";
import type {IconProps} from "../../../types/commonTypes.ts";

export default function EditIcon({
  size = 24,
  color = "currentColor",
  title = "Edit icon",
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
        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
