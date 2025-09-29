import { lazy, type FC } from "react";
import "./ContactForm.scoped.scss";
import MeliInput from "@/components/input/MeliInput";
import MeliButton from "@/components/button/MeliButton";
import { useTranslation } from "react-i18next";

const Captcha = lazy(() => import("@components/captcha/Captcha"));

const ContactForm: FC = () => {
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data",
  });

  return (
    <div className="contact-form">
      <div className="contact-form__inputs">
        <MeliInput placeholder={t("inputs.full-name")} />
        <MeliInput placeholder={t("inputs.country")} />
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
