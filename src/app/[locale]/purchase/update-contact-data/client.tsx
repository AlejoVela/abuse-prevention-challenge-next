"use client";

import dynamic from "next/dynamic";

const UpdateContactDataPage = dynamic(() => import("@/pages/update-contact-data/UpdateContactDataPage"), { ssr: false });

export function ClientOnly() {
  return <UpdateContactDataPage />;
}
