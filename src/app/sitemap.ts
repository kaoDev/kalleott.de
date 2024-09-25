import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { MetadataRoute } from "next";

async function getAllPosts() {
	const payload = await getPayloadHMR({ config: configPromise });

	const { docs } = await payload.find({
		collection: "posts",
		depth: 0,
		limit: 1000,
		sort: "-publishedAt",
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	return docs;
}

async function getAllPages() {
	const payload = await getPayloadHMR({ config: configPromise });

	const { docs } = await payload.find({
		collection: "pages",
		depth: 0,
		limit: 1000,
		sort: "-publishedAt",
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	return docs;
}

const pagesToIgnore = new Set(["imprint", "privacy"]);

const baseUrl = "https://kalleott.de";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();

	const pages = await getAllPages();

	return [
		{
			url: baseUrl,
			priority: 1,
		},
		{
			url: `${baseUrl}/chili-corner`,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/book-shelf`,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/portfolio`,
			priority: 0.6,
		},
		...pages
			.filter((p) => !!p.slug && !pagesToIgnore.has(p.slug))
			.map((p) => ({
				url: `${baseUrl}/${p.slug}`,
				priority: 0.8,
			})),
		{
			url: `${baseUrl}/posts`,
			priority: 0.6,
		},
		...Array.from({ length: Math.ceil(posts.length / 12) }, (_, i) => ({
			url: `${baseUrl}/posts/page/${i + 1}`,
			priority: 0.6,
		})),
		...posts.map((post) => ({
			url: `${baseUrl}/posts/${post.slug}`,
			lastModified: post.publishedAt
				? new Date(post.publishedAt)
				: new Date(post.createdAt),
			priority: 0.8,
		})),
	];
}
