import type { FC } from "react";
import "./MeliInput.scoped.scss";

interface MeliInputProps {
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const MeliInput: FC<MeliInputProps> = ({ placeholder, error, value, onChange }) => {
  return (
    <div className="meli-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`meli-input__field ${
          error ? "meli-input__field--error" : ""
        }`}
        placeholder={placeholder}
      />
      {error && <div className="meli-input__error">{error}</div>}
    </div>
  );
};

export default MeliInput;
