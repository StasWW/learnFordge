import type {MouseEventHandler} from "react";
import {useNavigate, type To} from "react-router-dom";
import IconButton, {type IconButtonProps} from "./IconButton.tsx";
import ChevronIcon from "../images/commonIcons/ChevronIcon.tsx";
import "../../styles/common/BackButton.css";

type BackButtonBaseProps = Omit<IconButtonProps, "icon" | "onClick" | "aria-label"> & {
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type BackButtonProps = BackButtonBaseProps & (
  | { fallbackPath: To; FallbackPath?: never; }
  | { FallbackPath: To; fallbackPath?: never; }
);

export default function BackButton({
  fallbackPath,
  FallbackPath,
  className,
  ariaLabel = "Назад",
  onClick,
  ...props
}: BackButtonProps) {
  const navigate = useNavigate();
  const resolvedFallbackPath = fallbackPath ?? FallbackPath;
  const buttonClassName = className ? `back-button ${className}` : "back-button";

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(resolvedFallbackPath);
  };

  return (
    <IconButton
      {...props}
      className={buttonClassName}
      aria-label={ariaLabel}
      icon={<ChevronIcon className="back-button__icon" direction="left" aria-hidden="true" />}
      onClick={handleClick}
    />
  );
}
