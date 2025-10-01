import { lazy, useEffect, type FC } from "react";
import "./ContactForm.scoped.scss";
import MeliInput from "@/components/input/MeliInput";
import MeliButton from "@/components/button/MeliButton";
import { useTranslation } from "react-i18next";
import MeliAutocomplete from "@/components/autocomplete/MeliAutocomplete";
import type { SelectOption } from "@/types";
import {
  actionsContactStore,
  useContactStore,
} from "@/services/store/useContactStore";

const Captcha = lazy(() => import("@components/captcha/Captcha"));

const ContactForm: FC = () => {
  //* translations
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data",
  });

  //* Store
  const countries = useContactStore((state) => state.countries);
  const contactData = useContactStore((state) => state.contactData);

  useEffect(() => {
    actionsContactStore.loadCountries();
    actionsContactStore.loadContactData();
  }, []);

  const handleCountrySelect = (option: SelectOption) => {
    actionsContactStore.updateCountry(option);
  };

  return (
    <div className="contact-form">
      <div className="contact-form__inputs">
        <MeliInput
          value={contactData.fullname}
          placeholder={t("inputs.full-name")}
        />
        <MeliAutocomplete
          value={{
            label: contactData?.country.name,
            value: contactData?.country.id,
          }}
          searchPlaceholder={t("inputs.search")}
          noResultsText={t("inputs.no-results")}
          placeholder={t("inputs.country")}
          onSelect={handleCountrySelect}
          options={countries}
        />
        <MeliInput
          value={contactData.address}
          placeholder={t("inputs.address")}
        />
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
