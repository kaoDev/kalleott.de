import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";

const vercelEnv = process.env.VERCEL_ENV;
const vercelBranchUrl = process.env.VERCEL_BRANCH_URL;
const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export function getEnvServerUrl() {
  console.log("##############");
  console.log("##############");
  console.log("##############");
  console.log("##############");
  console.log("##############");
  console.log("SERVER URL");
  console.log("VERCEL ENV", vercelEnv);
  console.log("VERCEL BRANCH URL", vercelBranchUrl);
  console.log("VERCEL PROJECT PRODUCTION URL", vercelProjectProductionUrl);
  console.log("##############");
  console.log("##############");
  console.log("##############");
  console.log("##############");
  console.log("##############");

  if (!vercelEnv) {
    return "http://localhost:3000";
  }

  if (vercelEnv === "production") {
    return `https://${vercelProjectProductionUrl}`;
  }

  return `https://${vercelBranchUrl}`;
}

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
  env: {
    NEXT_PUBLIC_SERVER_URL: getEnvServerUrl(),
    PAYLOAD_PUBLIC_SERVER_URL: getEnvServerUrl(),
  },
  reactStrictMode: true,
};

export default withPayload(nextConfig);
