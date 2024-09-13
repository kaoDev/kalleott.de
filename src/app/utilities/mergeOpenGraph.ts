import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description: "Kalle's personal website",
	images: [
		{
			url: `${process.env.NEXT_PUBLIC_SERVER_URL}/website-template-OG.webp`,
		},
	],
	siteName: "Kalle Ott",
	title: "Kalle Ott",
};

export const mergeOpenGraph = (
	og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
