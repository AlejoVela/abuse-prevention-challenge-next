import type { FC } from "react";
import style from "./MeliButton.module.scss";

interface MeliButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const MeliButton: FC<MeliButtonProps> = ({
  variant = "primary",
  text,
  onClick,
}) => {
  return (
    <button type="button" className={`${style["meli-button"]} ${style[`meli-button--${variant}`]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default MeliButton;
