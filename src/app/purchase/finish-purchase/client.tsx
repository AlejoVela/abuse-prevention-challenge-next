"use client";

import dynamic from "next/dynamic";

const FinishPurchasePage = dynamic(() => import("../../../pages/finish-purchase/FinishPurchase"), { ssr: false });

export function ClientOnly() {
  return <FinishPurchasePage />;
}
