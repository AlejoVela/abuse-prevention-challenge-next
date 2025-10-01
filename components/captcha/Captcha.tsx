import type { FC } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onChange?: (token: string | null) => void;
  onError?: () => void;
}

const Captcha: FC<CaptchaProps> = ({ onChange, onError }) => {
  const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

  const handleCaptcha = (value: string | null) => {
    console.log("Captcha value:", value);
    onChange?.(value);
  };

  const handleError = () => {
    console.error("Error loading reCAPTCHA");
    onError?.();
  };

  if (!siteKey) {
    console.error("NEXT_PUBLIC_CAPTCHA_SITE_KEY no está definida en las variables de entorno");
    return <div>Error: Clave de reCAPTCHA no configurada</div>;
  }

  return (
    <ReCAPTCHA
      sitekey={siteKey}
      onChange={handleCaptcha}
      onErrored={handleError}
      onExpired={() => handleCaptcha(null)}
    />
  );
};

export default Captcha;
