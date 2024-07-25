/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    env: {
        // localApi: 'http://localhost/pom/public/api/',
        localApi: 'https://api.planetofmedicine.com/api/',
        firebase_key: "BIutuhaOvqImTR8RpGVoDLHDSzeJay1fAXWes5wWtLmLLBKkyOxUebJA2fQu3hfiwhHq51BKfzDT-tni6ndtVcM",
    },
};
export default withNextIntl(nextConfig);