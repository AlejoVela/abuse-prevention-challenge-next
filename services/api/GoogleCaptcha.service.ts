import { apiCall } from "./base";
import type { CaptchaValidationRequest, CaptchaValidationResponse } from "./types";

export const GoogleCaptchaService = () => {
  const baseCaptchaEndpoint = "https://www.google.com/recaptcha/api/siteverify";

  const validateCaptcha = async (token: string): Promise<boolean> => {
    if (!token || token.trim().length === 0) {
      throw new Error("Captcha token cannot be empty");
    }

    try {
      const payload: CaptchaValidationRequest = {
        token: token.trim(),
      };

      const response = await apiCall<CaptchaValidationResponse>(
        baseCaptchaEndpoint,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: JSON.stringify(payload),
        },
        false
      );

      return response.success;
    } catch (error) {
      console.error("Error validating captcha:", error);
      throw new Error("Failed to validate captcha token");
    }
  };

  return {
    validateCaptcha,
  };
};

export default GoogleCaptchaService;