/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Proxy API requests
                destination: `${process.env.BACKEND_API_URL}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;