import type { FC } from "react";
import "./MeliButton.scoped.scss";

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
    <button className={`meli-button meli-button--${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default MeliButton;
