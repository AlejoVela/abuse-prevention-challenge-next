import { FC, useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import style from "./LanguageSelector.module.scss";

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ className }) => {
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "es-AR";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const languages = [
    { code: "es-AR", name: "Español", flag: "🇦🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
  ];
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      setIsOpen(false);
      setIsNavigating(false);
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    if (isNavigating || languageCode === currentLocale) return;

    setIsNavigating(true);
    setIsOpen(false);

    try {
      const currentPath = window.location.pathname;

      const validLocales = ["es-AR", "en-US", "pt-BR"];
      let pathWithoutLocale = currentPath;
      for (const locale of validLocales) {
        if (currentPath.startsWith(`/${locale}`)) {
          pathWithoutLocale = currentPath.substring(`/${locale}`.length);
          break;
        }
      }

      if (!pathWithoutLocale || pathWithoutLocale === "/") {
        pathWithoutLocale = "/purchase/update-contact-data";
      }

      const newPath = `/${languageCode}${pathWithoutLocale}`;

      console.log("Navigating from:", currentPath, "to:", newPath);
      requestAnimationFrame(() => {
        router.push(newPath);
      });
    } catch (error) {
      console.error("Error during navigation:", error);
      setIsNavigating(false);
    }
  };

  const toggleDropdown = () => {
    if (isNavigating) return;
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${style["language-selector"]} ${className || ""}`}
    >
      <button
        type="button"
        className={style["language-selector__button"]}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={isNavigating}
      >
        <span className={style["language-selector__flag"]}>
          {currentLanguage.flag}
        </span>
        <span className={style["language-selector__name"]}>
          {currentLanguage.name}
        </span>
        <span
          className={`${style["language-selector__arrow"]} ${
            isOpen ? style["language-selector__arrow--open"] : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && !isNavigating && (
        <div className={style["language-selector__dropdown"]}>
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className={`${style["language-selector__option"]} ${
                language.code === currentLocale
                  ? style["language-selector__option--active"]
                  : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className={style["language-selector__flag"]}>
                {language.flag}
              </span>
              <span className={style["language-selector__name"]}>
                {language.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
