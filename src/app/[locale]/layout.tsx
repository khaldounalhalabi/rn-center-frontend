import DirectionProvider from "@/components/providers/DirectionProvider";
import { locales } from "@/navigation";
import type { Metadata, Viewport } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Cairo, Inter, Kodchasan } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import "./global.css";

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
    title: "Reslan Alnaal Medical Center",
    description:
      "Reslan Alnaal Medical Center Management System , Manage your center appointments , patients , employees & doctors , payrolls , attendance , vacations and holidays all in one place.",
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.ico",
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
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${kodChasan.variable} ${CairoFont.variable} ${locale == "ar" ? "Cairo" : "kodchasan"}`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CookiesProvider>
            <NextTopLoader showSpinner={false} />
            <DirectionProvider direction={locale == "ar" ? "rtl" : "ltr"}>
              {children}
            </DirectionProvider>
          </CookiesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
