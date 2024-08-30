/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";

const withNextIntl = createNextIntlPlugin();
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  swSrc: "service-worker.js",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
    exclude: [/middleware-manifest.json$/],
  },
});
const nextConfig = {
  env: {
    // localApi: 'http://localhost/pom/public/api/',
    localApi: "https://api.planetofmedicine.com/api/",
    firebase_key:
      "BIutuhaOvqImTR8RpGVoDLHDSzeJay1fAXWes5wWtLmLLBKkyOxUebJA2fQu3hfiwhHq51BKfzDT-tni6ndtVcM",
  },
};

export default withNextIntl(withPWA(nextConfig));
