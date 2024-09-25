import type { Metadata, Viewport } from "next";
import { Cairo, Inter, Kodchasan } from "next/font/google";
import "./global.css";
import React from "react";
import { CookiesProvider } from "next-client-cookies/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });
const kodChasan = Kodchasan({
  subsets: ["latin"],
  weight: ["600", "300"],
  variable: "--font-kodchasan",
});
const CairoFont = Cairo({
  subsets: ["latin"],
  weight: ["600", "300"],
  variable: "--font-Cairo",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === "ar" ? "كوكب الطب" : "Planet of Medicine",
    description:
      locale === "ar"
        ? "منصة متكاملة لإدارة العيادات الطبية وحجز المواعيد عبر الإنترنت بسهولة. خدمات مميزة ستوفر لك تجربة احترافية ومريحة."
        : "An integrated platform for managing medical clinics and booking online appointments easily. Distinctive services that will provide you with a professional and comfortable experience.",
    manifest: "/manifest.json",
    icons: {
      icon: "/pom.ico",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fff",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html
      lang={locale == "ar" ? "ar" : "en"}
      dir={locale == "ar" ? "rtl" : "ltr"}
    >
      <body
        className={`${inter.className} ${kodChasan.variable} ${CairoFont.variable} min-h-screen ${locale == "ar" ? "Cairo" : ""}`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CookiesProvider>
            <NextTopLoader showSpinner={false} />
            {children}
          </CookiesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
