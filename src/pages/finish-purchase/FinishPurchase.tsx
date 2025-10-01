import Header from "@/components/header/Header";
import { useEffect, type FC } from "react";
import "./FinishPurchase.scoped.scss";
import MeliButton from "@/components/button/MeliButton";
import { useRouter } from "next/compat/router";
import {
  actionsContactStore,
  useContactStore,
} from "@/services/store/useContactStore";
import { useTranslation } from "react-i18next";

const FinishPurchase: FC = () => {
  //* Navigation
  const router = useRouter();

  //* Translation
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.finish-purchase",
  });

  //* Store
  const contactData = useContactStore((state) => state.contactData);

  //* Effects
  useEffect(() => {
    actionsContactStore.loadContactData();
  }, []);

  return (
    <div className="finish-purchase">
      <Header />
      <div className="finish-purchase__container">
        <div className="cards">
          <p className="cards__title">{t("review.title")}</p>
          <p className="cards__title2">{t("billing.title")}</p>
          <div className="card-summary">
            <div className="card-summary__image">
              <img
                className="card__image"
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_bill.svg"
              />
            </div>
            <div className="card-summary__content">
              <p className="card-summary__content-text">
                {contactData.fullname}
              </p>
              <p className="card-summary__content-text">
                {t("billing.id", { id: "123456" })}
              </p>
            </div>
          </div>
          <p className="cards__title2">{t("delivery.title")}</p>
          <div className="card-summary">
            <div className="card-summary__image">
              <img
                className="card__image"
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_gps_pin.svg"
              />
            </div>
            <div className="card-summary__content">
              <p className="card-summary__content-text">
                {contactData.address &&
                  `${contactData.address}, ${contactData.country.name}`}
              </p>
              <p className="card-summary__content-text">
                {t("delivery.home-delivery")}{" "}
                <a
                  className="card-summary__content-link"
                  onClick={() => {
                    router?.replace("/update-contact-data");
                  }}
                >
                  {t("delivery.modify-delivery")}
                </a>
              </p>
            </div>
          </div>
          <p className="cards__title2">{t("payment.title")}</p>
          <div className="card-summary">
            <div className="card-summary__image">
              <img
                className="card__image"
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_master.svg"
              />
            </div>
            <div className="card-summary__content">
              <p className="card-summary__content-text">
                {t("payment.bank-card", { bank: "xx", lastDigits: "2160" })}
              </p>
              <p className="card-summary__content-text">
                {t("payment.installments", { quantity: "1", amount: "55.831" })}{" "}
                <a className="card-summary__content-link">
                  {t("payment.modify-installments")}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="amount-summary">
          <div className="amount-summary__section">
            <p className="amount-summary__section-text">{t("summary.title")}</p>
          </div>
          <div className="amount-summary__section">
            <p className="amount-summary__section-text">
              <span>{t("summary.product")}</span>
              <span>$ 34.751</span>
            </p>
            <p className="amount-summary__section-text">
              <span>{t("summary.shipping")}</span>
              <span>$ 21.080</span>
            </p>
          </div>
          <div className="amount-summary__section">
            <p className="amount-summary__section-text">
              <span>{t("summary.subtotal")}</span>
              <span>$ 55.831</span>
            </p>
          </div>
          <div className="amount-summary__section">
            <p className="amount-summary__section-text--bold amount-summary__section-text">
              <span>{t("summary.total")}</span>
              <span>
                {t("summary.total-installments", {
                  quantity: "1",
                  amount: "55.831",
                })}
              </span>
            </p>
            <p className="amount-summary__section-text--bold amount-summary__section-subtext">
              {t("summary.bank-info", { bank: "xx", lastDigits: "2160" })}
            </p>
            <MeliButton text={t("buttons.confirm-purchase")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPurchase;
