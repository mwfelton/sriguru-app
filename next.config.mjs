/** @type {import('next').NextConfig} */

const withPWA = (await import("@ducanh2912/next-pwa")).default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    }
});

const nextConfig = {};

export default withPWA(nextConfig);
