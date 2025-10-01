import path from "path";

const nextConfig = {
  experimental: {
    optimizePackageImports: ["i18next", "react-i18next"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false,
  sassOptions: {
    includePaths: ["./"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./"),
      "@/app": path.resolve("./app"),
      "@assets": path.resolve("./public/assets"),
      "@/assets": path.resolve("./public/assets"),
      "@public": path.resolve("./public"),
      "@components": path.resolve("./components"),
      "@pages": path.resolve("./app"),
      "@services": path.resolve("./services"),
      "@utils": path.resolve("./utils"),
      "@tests": path.resolve("./tests"),
    };
    
    return config;
  },
};

export default nextConfig;
