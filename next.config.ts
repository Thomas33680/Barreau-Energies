import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.barreau-energies.fr" }],
        destination: "https://barreau-energies.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
