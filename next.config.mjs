/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    env: {
        // localApi: 'http://localhost/pom/public/api/',
        localApi: 'https://api.planetofmedicine.com/api/',
    },
};
export default withNextIntl(nextConfig);
