import path from "path";

const nextConfig = {
  distDir: "./dist",
  experimental: {
    optimizePackageImports: ["i18next", "react-i18next"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: ["./src"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./src"),
      "@/app": path.resolve("./src/app"),
      "@assets": path.resolve("./public/assets"),
      "@/assets": path.resolve("./public/assets"),
      "@public": path.resolve("./public"),
      "@components": path.resolve("./src/components"),
      "@pages": path.resolve("./src/app"),
      "@services": path.resolve("./src/services"),
      "@utils": path.resolve("./src/utils"),
      "@tests": path.resolve("./tests"),
    };
    return config;
  },
};

export default nextConfig;
