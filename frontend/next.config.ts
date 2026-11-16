import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static copy (used for the shareable preview)
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? { output: "export", images: { unoptimized: true } }
  : {};

export default nextConfig;
