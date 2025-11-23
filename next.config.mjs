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
					port: url.port || undefined,
					pathname: "/**",
				};
			}),
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		// Allow local IP addresses for development (Next.js 16 security feature)
		// Only enable in development - this allows localhost images to be optimized
		...(process.env.NODE_ENV === "development"
			? { dangerouslyAllowLocalIP: true }
			: undefined),
	},
	env: {
		NEXT_PUBLIC_SERVER_URL: getEnvServerUrl(),
		PAYLOAD_PUBLIC_SERVER_URL: getEnvServerUrl(),
	},
	reactStrictMode: true,
	reactCompiler: true,
	// PPR (Partial Prerendering) is now stable in Next.js 16 and enabled by default
	// No need to configure it in experimental
	// eslint config removed - use next lint command directly
	serverExternalPackages: ["thread-stream"],
	webpack: (config, { isServer }) => {
		if (isServer) {
			// Exclude test files from server-side webpack processing
			config.resolve = config.resolve || {};
			config.resolve.alias = config.resolve.alias || {};
			config.resolve.alias["thread-stream/test"] = false;
		}
		return config;
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
