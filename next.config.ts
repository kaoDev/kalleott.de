import { withPayload } from "@payloadcms/next/withPayload";
import { NextConfig } from "next";
import { getEnvServerUrl } from "@/utilities/getEnvServerUrl.js";

const NEXT_PUBLIC_SERVER_URL = getEnvServerUrl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, "https://kalleott.de"].map((item) => {
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
