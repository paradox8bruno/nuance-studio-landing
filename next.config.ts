import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pagina-vendas.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/politica-de-privacidade.html",
        destination: "/politica-de-privacidade",
        permanent: true,
      },
      {
        source: "/termos-de-uso.html",
        destination: "/termos-de-uso",
        permanent: true,
      },
      {
        source: "/quiz/index.html",
        destination: "/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
