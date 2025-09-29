import type { FC } from "react";
import "./UpdateContactDataPage.scoped.scss";
import Header from "./header/Header";
import ContactForm from "./form/ContactForm";

const UpdateContactDataPage: FC = () => {
  return (
    <div className="update-contact-data-page">
      <Header />
      <div className="update-contact-data-page__info">
        <p className="update-contact-data-page__info-text">
          We're almost there...
        </p>
        <p className="update-contact-data-page__info-text">
          Update your contact information
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export default UpdateContactDataPage;
