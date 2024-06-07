/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withPWA = withPWAInit({
    dest: "public",
    register: true,
    swSrc: 'service-worker.js',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
        exclude: [/middleware-manifest.json$/]
    }
});

const nextConfig = {
    env: {
        // localApi: 'http://localhost/pom/public/api/',
        // localApi: 'http://api.planetofmedicine.com/api/',
        localApi: 'https://api.planetofmedicine.com/api/',
    },
};
export default withNextIntl(withPWA(nextConfig));
