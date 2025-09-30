import { useState, type FC } from "react";
import "./MeliAutocomplete.scoped.scss";
import { SearchIcon } from "@/assets/svg";

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
    <div className="meli-autocomplete">
      <button
        onClick={handleFocus}
        className={`meli-autocomplete__button ${
          value?.label && "meli-autocomplete__button--value"
        }`}
        type="button"
      >
        {value?.label ?? placeholder}
      </button>
      {isFocused && (
        <div className="meli-autocomplete__dropdown">
          <div className="meli-autocomplete__dropdown-input">
            <div className="meli-autocomplete__dropdown-input-search">
              <img
                src={SearchIcon}
                alt="Search"
                className="meli-autocomplete__dropdown-input-search-icon"
              />
              <input
                type="text"
                autoFocus
                className="meli-autocomplete__dropdown-input-search-field"
                value={search}
                placeholder={searchPlaceholder}
                onChange={(e) => handleSearchChange?.(e.target.value)}
              />
            </div>
          </div>
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              className="meli-autocomplete__dropdown-option"
              type="button"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </button>
          ))}

          {filteredOptions.length === 0 && (
            <div className="meli-autocomplete__dropdown-no-options">
              {noResultsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeliAutocomplete;
