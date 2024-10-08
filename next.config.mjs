import { withPayload } from "@payloadcms/next/withPayload";

const vercelEnv = process.env.VERCEL_ENV;
const vercelDeploymentUrl = process.env.VERCEL_URL;
const vercelProjectProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export function getEnvServerUrl() {
	if (!vercelEnv) {
		return "http://localhost:3000";
	}

	if (vercelEnv === "production") {
		return `https://${vercelProjectProductionUrl}`;
	}

	return `https://${vercelDeploymentUrl}`;
}

const availableServerUrls = [
	vercelProjectProductionUrl ? `https://${vercelProjectProductionUrl}` : null,
	vercelDeploymentUrl ? `https://${vercelDeploymentUrl}` : null,
	"http://localhost:3000",
].filter((url) => url != null);

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			...availableServerUrls.map((item) => {
				const url = new URL(item);

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(":", ""),
				};
			}),
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	env: {
		NEXT_PUBLIC_SERVER_URL: getEnvServerUrl(),
		PAYLOAD_PUBLIC_SERVER_URL: getEnvServerUrl(),
	},
	reactStrictMode: true,
	experimental: {
		ppr: true,
		reactCompiler: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	redirects: async () => {
		return [
			{
				source: "/posts/project-webapp/:slug",
				destination: "/posts/project-webapp-:slug",
				permanent: true,
			},
			{
				source: "/posts/iot/:slug",
				destination: "/posts/iot-:slug",
				permanent: true,
			},
		];
	},
};

export default withPayload(nextConfig);
