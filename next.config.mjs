import path from 'path';

const nextConfig = {
  output: "export",
  distDir: "./dist",
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('./src'),
      '@/app': path.resolve('./src/app'),
      '@assets': path.resolve('./src/assets'),
      '@public': path.resolve('./src/public'),
      '@typings': path.resolve('./src/typings'),
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/app'),
      '@services': path.resolve('./src/services'),
      '@utils': path.resolve('./src/utils'),
      '@tests': path.resolve('./tests'),
    };
    return config;
  },
};

export default nextConfig;
