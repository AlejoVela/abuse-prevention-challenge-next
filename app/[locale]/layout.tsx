import I18nProvider from "@/providers/I18nProvider";

export async function generateStaticParams() {
  return [{ locale: "es-AR" }, { locale: "en-US" }, { locale: "pt-BR" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return <I18nProvider>{children}</I18nProvider>;
}
