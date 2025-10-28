/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["zvijude"],
    serverActions: {
      bodySizeLimit: "9mb",
    },
  },
  devIndicators: false,
  serverExternalPackages: ["knex"],
  poweredByHeader: false,
};

export default nextConfig;
