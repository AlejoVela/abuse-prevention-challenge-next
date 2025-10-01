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
import { useContactFormValidation } from "@/hooks/useContactFormValidation";
import { useRouter, useParams } from 'next/navigation'

const Captcha = lazy(() => import("@components/captcha/Captcha"));

const ContactForm: FC = () => {
  //* translations
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data",
  });

  //* Validation hook
  const {
    isSubmitting,
    validationErrors,
    captchaToken,
    setIsSubmitting,
    clearError,
    clearAllErrors,
    validateForm,
    handleCaptchaChange,
    handleCaptchaError,
    setMultipleErrors,
    setGeneralError,
  } = useContactFormValidation();

  //* Store
  const countries = useContactStore((state) => state.countries);
  const contactData = useContactStore((state) => state.contactData);

  //* Navigation
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string || 'es-AR';

  //* Effects
  useEffect(() => {
    actionsContactStore.loadCountries();
    actionsContactStore.loadContactData();
  }, []);

  const handleCountrySelect = (option: SelectOption) => {
    actionsContactStore.updateCountry(option);
    clearError("country");
  };

  const handleFullnameChange = (newValue: string) => {
    useContactStore.setState({
      contactData: { ...contactData, fullname: newValue },
    });
    clearError("fullname");
  };

  const handleAddressChange = (newValue: string) => {
    useContactStore.setState({
      contactData: { ...contactData, address: newValue },
    });
    clearError("address");
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    clearAllErrors();
    setIsSubmitting(true);
    
    try {
      const validation = validateForm(contactData, captchaToken);

      if (!validation.success && validation.errors) {
        setMultipleErrors(validation.errors);
        return;
      }

      await actionsContactStore.updateContactData(contactData);
      router.push(`/${locale}/purchase/finish-purchase`);
    } catch (error) {
      console.error("Error updating contact data:", error);
      setGeneralError(t("errors.general.submit-error"));
    } finally {
    setIsSubmitting(false);
  }
  };

  const handleGoBack = () => {
    console.log("Go back clicked");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {validationErrors.general && (
        <div className="contact-form__error contact-form__error--general">
          {validationErrors.general}
        </div>
      )}
      <div className="contact-form__inputs">
        <div className="contact-form__input-group">
          <MeliInput
            value={contactData.fullname}
            onChange={handleFullnameChange}
            placeholder={t("inputs.full-name")}
          />
          {validationErrors.fullname && (
            <div className="contact-form__error">
              {validationErrors.fullname}
            </div>
          )}
        </div>
        <div className="contact-form__input-group">
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
          {validationErrors.country && (
            <div className="contact-form__error">
              {validationErrors.country}
            </div>
          )}
        </div>
        <div className="contact-form__input-group">
          <MeliInput
            value={contactData.address}
            onChange={handleAddressChange}
            placeholder={t("inputs.address")}
          />
          {validationErrors.address && (
            <div className="contact-form__error">
              {validationErrors.address}
            </div>
          )}
        </div>
      </div>
      <div className="contact-form__captcha">
        <Captcha onChange={handleCaptchaChange} onError={handleCaptchaError} />
        {validationErrors.captcha && (
          <div className="contact-form__error">{validationErrors.captcha}</div>
        )}
      </div>
      <div className="contact-form__buttons">
        <MeliButton
          onClick={handleGoBack}
          text={t("buttons.go-back")}
          variant="secondary"
        />
        <MeliButton
          onClick={handleSubmit}
          text={isSubmitting ? "Enviando..." : t("buttons.next")}
        />
      </div>
    </form>
  );
};

export default ContactForm;
