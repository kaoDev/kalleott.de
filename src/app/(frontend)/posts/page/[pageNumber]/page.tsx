import configPromise from "@payload-config";
import type { Metadata } from "next/types";
import { getPayload } from "payload";
import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { Prose } from "@/components/Prose/Prose";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page({
	params,
}: {
	params: Promise<{ pageNumber: string }>;
}) {
	const { pageNumber = "2" } = await params;
	const payload = await getPayload({ config: configPromise });

	const posts = await payload.find({
		collection: "posts",
		depth: 1,
		limit: 12,
		sort: "-publishedAt",
		page: Number(pageNumber),
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	return (
		<div className="pt-24 pb-24">
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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ pageNumber: string }>;
}): Promise<Metadata> {
	const { pageNumber = "2" } = await params;
	const numericPageNumber = Number(pageNumber);

	const title =
		numericPageNumber > 1 ? `Kalle's Blog Page ${pageNumber}` : "Kalle's Blog";

	return {
		title,
	};
}

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
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

	const pages: Array<{ pageNumber: string }> = [];

	for (let i = 1; i <= posts.totalPages; i++) {
		pages.push({ pageNumber: String(i) });
	}

	return pages;
}
