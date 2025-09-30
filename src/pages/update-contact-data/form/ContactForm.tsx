import { lazy, useState, type FC } from "react";
import "./ContactForm.scoped.scss";
import MeliInput from "@/components/input/MeliInput";
import MeliButton from "@/components/button/MeliButton";
import { useTranslation } from "react-i18next";
import MeliAutocomplete from "@/components/autocomplete/MeliAutocomplete";
import type { SelectOption } from "@/types";

const Captcha = lazy(() => import("@components/captcha/Captcha"));

const ContactForm: FC = () => {
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data",
  });
  const [country, setCountry] = useState<SelectOption>();
  const handleCountrySelect = (option: SelectOption) => {
    setCountry(option);
  };

  return (
    <div className="contact-form">
      <div className="contact-form__inputs">
        <MeliInput placeholder={t("inputs.full-name")} />
        <MeliAutocomplete
          value={country}
          searchPlaceholder={t("inputs.search")}
          noResultsText={t("inputs.no-results")}
          placeholder={t("inputs.country")}
          onSelect={handleCountrySelect}
          options={[
            { label: "Argentina", value: "AR" },
            { label: "Brasil", value: "BR" },
            { label: "Chile", value: "CL" },
            { label: "Colombia", value: "CO" },
            { label: "México", value: "MX" },
            { label: "Perú", value: "PE" },
            { label: "Uruguay", value: "UY" },
          ]}
        />
        <MeliInput placeholder={t("inputs.address")} />
      </div>
      <div className="contact-form__captcha">
        <Captcha />
      </div>
      <div className="contact-form__buttons">
        <MeliButton text={t("buttons.go-back")} variant="secondary" />
        <MeliButton text={t("buttons.next")} />
      </div>
    </div>
  );
};

export default ContactForm;
