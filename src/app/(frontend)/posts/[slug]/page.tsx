import configPromise from "@payload-config";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { cache } from "react";
import { RichText } from "src/app/components/RichText";
import { SubscribeToUpdatesForm } from "@/(frontend)/_components/subscribe-to-updates-form";
import { RelatedPosts } from "@/blocks/RelatedPosts";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { Separator } from "@/components/ui/separator";
import { PostHero } from "../../../heros/PostHero";
import { generateMeta } from "../../../utilities/generateMeta";
import PageClient from "./page.client";

export const revalidate = 600;
export const dynamic = "force-static";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "posts",
		draft: false,
		limit: 1000,
		overrideAccess: false,
		sort: "-publishedAt",
		where: {
			_status: {
				equals: "published",
			},
		},
	});

	return posts.docs?.map(({ slug }) => ({ slug }));
}

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function Post({ params }: Props) {
	const { slug } = await params;
	const url = `/posts/${slug}`;
	const post = await queryPostBySlug({ slug });

	if (!post) return <PayloadRedirects url={url} />;

	return (
		<article className="pt-16 pb-16">
			<PageClient heroSection="highImpact" />

			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			<PostHero post={post} />

			<div className="flex flex-col gap-4 pt-8">
				<div className="container grid-rows-[1fr] lg:grid lg:grid-cols-[1fr_48rem_1fr]">
					<RichText
						className="col-span-3 col-start-1 grid-rows-[1fr] lg:mx-0 lg:grid lg:grid-cols-subgrid"
						content={post.content}
						enableGutter={false}
					/>
				</div>

				<Separator className="mt-12" />

				<RelatedPosts
					className="mt-12"
					docs={post.relatedPosts?.filter((post) => typeof post === "object")}
				/>
				<div className="container mt-12">
					<SubscribeToUpdatesForm />
				</div>
			</div>
		</article>
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await queryPostBySlug({ slug });

	if (!post) {
		notFound();
	}

	return generateMeta({ doc: post });
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "posts",
		draft,
		limit: 1,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return result.docs?.[0] || null;
});
