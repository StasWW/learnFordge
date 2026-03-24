import {forwardRef, type ButtonHTMLAttributes, type ReactNode} from "react";
import Button from "./Button.tsx";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: ReactNode;
  children?: ReactNode;
  iconPosition?: "start" | "end";
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {icon, children, iconPosition = "start", ...props},
  ref,
) {
  return (
    <Button ref={ref} {...props}>
      {iconPosition === "start" && icon}
      {children}
      {iconPosition === "end" && icon}
    </Button>
  );
});

export default IconButton;
