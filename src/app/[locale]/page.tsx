"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const router = useRouter();
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      router.replace(`/${resolvedParams.locale}/purchase/update-contact-data`);
    };

    getParams();
  }, [router, params]);

  return null;
}
