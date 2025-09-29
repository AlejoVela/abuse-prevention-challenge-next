import type { FC } from "react";
import "./MeliInput.scoped.scss";

interface MeliInputProps {
  placeholder?: string;
  error?: string;
}
const MeliInput: FC<MeliInputProps> = ({ placeholder, error }) => {
  return (
    <div className="meli-input">
      <input
        type="text"
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
