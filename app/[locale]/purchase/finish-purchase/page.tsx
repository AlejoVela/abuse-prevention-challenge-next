"use client";

import Header from "@/components/header/Header";
import { useEffect, useState, type FC } from "react";
import style from "./page.module.scss";
import MeliButton from "@/components/button/MeliButton";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  actionsContactStore,
  useContactStore,
} from "@/services/store/useContactStore";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import AnimatedCheckmark from "@/components/animated-checkmark/AnimatedCheckmark";

const FinishPurchase: FC = () => {
  //* Navigation
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || "es-AR";
  const previousStep = searchParams.get("previous_step");
  const tokenCaptcha = searchParams.get("token");

  //* Translation
  const { t } = useTranslation(["translation"], {
    keyPrefix: "pages.finish-purchase",
  });

  //* Store
  const contactData = useContactStore((state) => state.contactData);
  const [finishPurchase, setFinishPurchase] = useState(false);

  //* Effects
  useEffect(() => {
    actionsContactStore.loadContactData();
  }, []);

  useEffect(() => {
    if (!tokenCaptcha || tokenCaptcha === "") {
      router.replace(
          `/${locale}/purchase/update-contact-data?error=captcha_invalid`
        );
    }
  }, [locale, router, tokenCaptcha]);

  return (
    <div className={style["finish-purchase"]}>
      <Header />
      <div className={style["finish-purchase__container"]}>
        <div className={style.cards}>
          <p className={style["cards__title"]}>{t("review.title")}</p>
          <p className={style["cards__title2"]}>{t("billing.title")}</p>
          <div className={style["card-summary"]}>
            <div className={style["card-summary__image"]}>
              <Image
                className={style["card__image"]}
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_bill.svg"
                alt="Billing"
                width={24}
                height={24}
              />
            </div>
            <div className={style["card-summary__content"]}>
              <p className={style["card-summary__content-text"]}>
                {contactData.fullname}
              </p>
              <p className={style["card-summary__content-text"]}>
                {t("billing.id", { id: "123456" })}
              </p>
            </div>
          </div>
          <p className={style["cards__title2"]}>{t("delivery.title")}</p>
          <div className={style["card-summary"]}>
            <div className={style["card-summary__image"]}>
              <Image
                className={style["card__image"]}
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_gps_pin.svg"
                alt="Delivery"
                width={24}
                height={24}
              />
            </div>
            <div className={style["card-summary__content"]}>
              <p className={style["card-summary__content-text"]}>
                {contactData.address &&
                  `${contactData.address}, ${contactData.country.name}`}
              </p>
              <p className={style["card-summary__content-text"]}>
                {t("delivery.home-delivery")}{" "}
                <a
                  className={style["card-summary__content-link"]}
                  onClick={() => {
                    router.push(
                      previousStep ?? `/${locale}/purchase/update-contact-data`
                    );
                  }}
                >
                  {t("delivery.modify-delivery")}
                </a>
              </p>
            </div>
          </div>
          <p className={style["cards__title2"]}>{t("payment.title")}</p>
          <div className={style["card-summary"]}>
            <div className={style["card-summary__image"]}>
              <Image
                className={style["card__image"]}
                src="https://http2.mlstatic.com/storage/buyingflow-core-assets-web/bf-assets/svg/bf_v6_master.svg"
                alt="Payment"
                width={24}
                height={24}
              />
            </div>
            <div className={style["card-summary__content"]}>
              <p className={style["card-summary__content-text"]}>
                {t("payment.bank-card", { bank: "xx", lastDigits: "2160" })}
              </p>
              <p className={style["card-summary__content-text"]}>
                {t("payment.installments", {
                  quantity: "1",
                  amount: "55.831",
                })}{" "}
                <a className={style["card-summary__content-link"]}>
                  {t("payment.modify-installments")}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={style["amount-summary"]}>
          <div className={style["amount-summary__section"]}>
            <p className={style["amount-summary__section-text"]}>
              {t("summary.title")}
            </p>
          </div>
          <div className={style["amount-summary__section"]}>
            <p className={style["amount-summary__section-text"]}>
              <span>{t("summary.product")}</span>
              <span>$ 34.751</span>
            </p>
            <p className={style["amount-summary__section-text"]}>
              <span>{t("summary.shipping")}</span>
              <span>$ 21.080</span>
            </p>
          </div>
          <div className={style["amount-summary__section"]}>
            <p className={style["amount-summary__section-text"]}>
              <span>{t("summary.subtotal")}</span>
              <span>$ 55.831</span>
            </p>
          </div>
          <div className={style["amount-summary__section"]}>
            <p
              className={`${style["amount-summary__section-text"]} ${style["amount-summary__section-text--bold"]}`}
            >
              <span>{t("summary.total")}</span>
              <span>
                {t("summary.total-installments", {
                  quantity: "1",
                  amount: "55.831",
                })}
              </span>
            </p>
            <p className={style["amount-summary__section-subtext"]}>
              {t("summary.bank-info", { bank: "xx", lastDigits: "2160" })}
            </p>
            {finishPurchase ? (
              <div className={style["amount-summary__section-checkmark"]}>
                <AnimatedCheckmark />
              </div>
            ) : (
              <MeliButton
                onClick={() => setFinishPurchase(true)}
                text={t("buttons.confirm-purchase")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPurchase;
