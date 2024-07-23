/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@shared/ui"],
  experimental: {
    serverComponentsExternalPackages: ["@medusajs/medusa"],
  },
};
