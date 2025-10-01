import type { FC } from "react";
import style from "./MeliInput.module.scss";

interface MeliInputProps {
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const MeliInput: FC<MeliInputProps> = ({ placeholder, error, value, onChange }) => {
  return (
    <div className={style["meli-input"]}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${style["meli-input__field"]} ${
          error ? style["meli-input__field--error"] : ""
        }`}
        placeholder={placeholder}
      />
      {error && <div className={style["meli-input__error"]}>{error}</div>}
    </div>
  );
};

export default MeliInput;
