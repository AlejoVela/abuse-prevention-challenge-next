"use client";

import dynamic from "next/dynamic";

const FinishPurchasePage = dynamic(
  () => import("./FinishPurchase"),
  { ssr: false }
);

export function ClientOnly() {
  return <FinishPurchasePage />;
}
