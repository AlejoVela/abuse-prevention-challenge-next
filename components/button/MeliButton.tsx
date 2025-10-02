import type { FC } from "react";
import style from "./MeliButton.module.scss";

interface MeliButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}

const MeliButton: FC<MeliButtonProps> = ({
  variant = "primary",
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`${style["meli-button"]} ${style[`meli-button--${variant}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MeliButton;
