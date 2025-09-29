import { lazy, type FC } from "react";
import "./ContactForm.scoped.scss";
import MeliInput from "@/components/input/MeliInput";
import MeliButton from "@/components/button/MeliButton";

const Captcha = lazy(
  () => import("@components/captcha/Captcha")
);

const ContactForm: FC = () => {
  return (
    <div className="contact-form">
      <div className="contact-form__inputs">
        <MeliInput placeholder="Fullname" />
        <MeliInput placeholder="Country" />
        <MeliInput placeholder="Address" />
      </div>
      <div className="contact-form__captcha">
        <Captcha />
      </div>
      <div className="contact-form__buttons">
        <MeliButton text="Go back" variant="secondary" />
        <MeliButton text="Next" />
      </div>
    </div>
  );
};

export default ContactForm;
