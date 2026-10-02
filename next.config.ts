import type { NextConfig } from "next";
const config: NextConfig = {
  allowedDevOrigins: ["192.168.100.13"],
  poweredByHeader: false,
  agentRules: false,
  images: { qualities: [75, 100] },
};
export default config;
