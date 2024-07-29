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

const nextConfig = {
    webpack(config, options) {
        config.module.rules.push({
          test: /\.mp3$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/sounds/',
              outputPath: 'static/sounds/',
              name: '[name].[ext]',
              esModule: false,
            },
          },
        });
    
        return config;
      },
};

export default withPWA(nextConfig);
