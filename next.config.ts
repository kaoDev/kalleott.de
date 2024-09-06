import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";

const vercelBranchUrl = process.env.VERCEL_BRANCH_URL;
const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const availableServerUrls = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  vercelProjectProductionUrl ? `https://${vercelProjectProductionUrl}` : null,
  vercelBranchUrl ? `https://${vercelBranchUrl}` : null,
  "https://kalleott.de",
].filter((url) => url != null);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...availableServerUrls.map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "") as "http" | "https",
        };
      }),
    ],
  },
  reactStrictMode: true,
};

export default withPayload(nextConfig);
