/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@shared/ui"],
  experimental: {
    serverComponentsExternalPackages: ["typeorm","@medusajs/medusa"],
  },
};
