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
    disable: false,
    workboxOptions: {
        disableDevLogs: true,
    }
});

const nextConfig = {

    env: {
        localApi: 'http://localhost/pom/public/api/',
        // localApi: 'http://planetofmedicine.com/',
    },
};
export default withNextIntl(withPWA(nextConfig));
