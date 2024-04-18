'use client'
import React from "react";
// import {getTranslations} from 'next-intl/server';
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations()
  // const t =await getTranslations()
  return <h1>{t('title')}</h1>;
};

export default Page;
