"use client";

import dynamic from "next/dynamic";

const UpdateContactDataPage = dynamic(
  () => import("./UpdateContactDataPage"),
  { ssr: false }
);

export function ClientOnly() {
  return <UpdateContactDataPage />;
}
