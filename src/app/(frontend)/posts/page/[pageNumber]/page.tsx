import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { Prose } from "@/components/Prose/Prose";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Metadata } from "next/types";
import React from "react";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page({ params: { pageNumber = 2 } }) {
	const payload = await getPayloadHMR({ config: configPromise });

	const posts = await payload.find({
		collection: "posts",
		depth: 1,
		limit: 12,
		sort: "-publishedAt",
		page: pageNumber,
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	return (
		<div className="pb-24 pt-24">
			<div className="container mb-16">
				<Prose>
					<h1>Posts</h1>
				</Prose>
			</div>

			<div className="container mb-8">
				<PageRange
					collection="posts"
					currentPage={posts.page}
					limit={12}
					totalDocs={posts.totalDocs}
				/>
			</div>

			<CollectionArchive posts={posts.docs} />

			<div className="container">
				{posts.totalPages > 1 && (
					<Pagination page={posts.page ?? 0} totalPages={posts.totalPages} />
				)}
			</div>
		</div>
	);
}

export function generateMetadata({ params: { pageNumber = 2 } }): Metadata {
	const title =
		pageNumber > 1 ? `Kalle's Blog Page ${pageNumber}` : "Kalle's Blog";

	return {
		title,
	};
}

export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise });
	const posts = await payload.find({
		collection: "posts",
		depth: 0,
		limit: 10,
		sort: "-publishedAt",
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	const pages = [];

	for (let i = 1; i <= posts.totalPages; i++) {
		pages.push(i);
	}

	return pages;
}
