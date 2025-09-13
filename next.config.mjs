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
        localApi: "http://localhost/rn-center-backend/public/api/",
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/rn-center-backend/public/**",
            }
        ],
    },
};

export default withNextIntl(nextConfig);
