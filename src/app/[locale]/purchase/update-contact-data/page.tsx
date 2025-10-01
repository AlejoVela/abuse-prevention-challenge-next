'use client';
import type { FC } from "react";
import style from "./page.module.scss";
import Header from "@/components/header/Header";
import ContactForm from "./form/ContactForm";
import { useTranslation } from "react-i18next";


const UpdateContactDataPage: FC = () => {
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.update-contact-data",
  });
  return (
    <div className={style["update-contact-data-page"]}>
      <Header />
      <div className={style["update-contact-data-page__info"]}>
        <p className={style["update-contact-data-page__info-text"]}>{t("info.title")}</p>
        <p className={style["update-contact-data-page__info-text"]}>
          {t("info.sub-title")}
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export default UpdateContactDataPage;
