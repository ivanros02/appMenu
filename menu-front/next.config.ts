import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cada restaurante carga sus propias fotos desde su propio storage,
    // por eso no hay una lista fija de dominios: se permite cualquier
    // origen https. Trade-off consciente para un SaaS multi-tenant.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
