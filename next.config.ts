import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  images: { qualities: [75, 100] },
};
export default config;
