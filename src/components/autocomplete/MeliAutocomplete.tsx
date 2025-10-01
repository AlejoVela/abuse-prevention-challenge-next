import { useState, type FC } from "react";
import style from "./MeliAutocomplete.module.scss";
import Image from "next/image";

interface AutocompleteOption {
  label: string;
  value: string;
}

export interface MeliAutocompleteProps {
  options: AutocompleteOption[];
  value?: AutocompleteOption;
  noResultsText?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onSelect?: (option: AutocompleteOption) => void;
  onSearchChange?: (value: string) => void;
}

const MeliAutocomplete: FC<MeliAutocompleteProps> = ({
  value,
  options,
  onSelect,
  onSearchChange,
  placeholder = "",
  searchPlaceholder = "Buscar",
  noResultsText = "No hay resultados",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    setIsFocused(false);
    onSelect?.(option);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  return (
    <div className={style["meli-autocomplete"]}>
      <button
        onClick={handleFocus}
        className={`${style["meli-autocomplete__button"]} ${
          value?.label && style["meli-autocomplete__button--value"]
        }`}
        type="button"
      >
        {value?.label && value?.label !== "" ? value.label : placeholder}
      </button>
      {isFocused && (
        <div className={style["meli-autocomplete__dropdown"]}>
          <div className={style["meli-autocomplete__dropdown-input"]}>
            <div className={style["meli-autocomplete__dropdown-input-search"]}>
              <Image
                src="/assets/svg/search-icon.svg"
                className={style["meli-autocomplete__dropdown-input-search-icon"]}
                alt="Search"
              />
              <input
                type="text"
                autoFocus
                className={style["meli-autocomplete__dropdown-input-search-field"]}
                value={search}
                placeholder={searchPlaceholder}
                onChange={(e) => handleSearchChange?.(e.target.value)}
              />
            </div>
          </div>
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              className={style["meli-autocomplete__dropdown-option"]}
              type="button"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </button>
          ))}

          {filteredOptions.length === 0 && (
            <div className={style["meli-autocomplete__dropdown-no-options"]}>
              {noResultsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeliAutocomplete;
