import { useMemo, useState } from "react";
import { z } from "zod";
import type { ContactData } from "@/services/api/types";
import { useTranslation } from "react-i18next";

export interface ValidationErrors {
  fullname?: string;
  country?: string;
  address?: string;
  captcha?: string;
  general?: string;
}

export const useContactFormValidation = () => {
  //* States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data.errors",
  });

  const contactFormSchema = useMemo(() => {
    return z.object({
      fullname: z
        .string()
        .min(1, t("fullname.required"))
        .min(2, t("fullname.min"))
        .max(100, t("fullname.max")),
      country: z.object({
        id: z.string().min(1, t("country.required")),
        name: z.string().min(1, t("country.required")),
      }),
      address: z
        .string()
        .min(1, t("address.required"))
        .min(5, t("address.min"))
        .max(200, t("address.max")),
      captcha: z
        .string()
        .min(1, t("captcha.required")),
    });
  }, [t]);

  const clearError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const clearAllErrors = () => {
    setValidationErrors({});
  };

  const validateForm = (
    contactData: ContactData,
    captchaToken: string | null
  ) => {
    try {
      const validatedData = contactFormSchema.parse({
        fullname: contactData.fullname,
        country: contactData.country,
        address: contactData.address,
        captcha: captchaToken || "",
      });
      return { success: true, data: validatedData, errors: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};

        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof ValidationErrors;
          if (field && field !== "general") {
            errors[field] = issue.message;
          }
        });

        return { success: false, data: null, errors };
      }
      return {
        success: false,
        data: null,
        errors: { general: t("general.validation-error") },
      };
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token && validationErrors.captcha) {
      clearError("captcha");
    }
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    setValidationErrors((prev) => ({
      ...prev,
      captcha: t("captcha.error"),
    }));
  };

  const setMultipleErrors = (errors: ValidationErrors) => {
    setValidationErrors(errors);
  };

  const setGeneralError = (message: string) => {
    setValidationErrors((prev) => ({
      ...prev,
      general: message,
    }));
  };

  return {
    // State
    isSubmitting,
    validationErrors,
    captchaToken,

    // Actions
    setIsSubmitting,
    setValidationErrors,
    setCaptchaToken,
    clearError,
    clearAllErrors,
    validateForm,
    handleCaptchaChange,
    handleCaptchaError,
    setMultipleErrors,
    setGeneralError,
  };
};
