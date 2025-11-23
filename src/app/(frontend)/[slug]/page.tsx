import configPromise from "@payload-config";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { cache } from "react";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { Blocks } from "../../components/Blocks";
import { Hero } from "../../components/Hero";
import { generateMeta } from "../../utilities/generateMeta";
import PageClient from "../posts/[slug]/page.client";

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise });
	const pages = await payload.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
	});

	return pages.docs
		?.filter((doc) => {
			return doc.slug !== "home";
		})
		.map(({ slug }) => {
			return { slug };
		});
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug = "home" } = await params;
	const url = `/${slug}`;

	const page = await queryPageBySlug({
		slug,
	});

	if (!page) {
		return <PayloadRedirects url={url} />;
	}

	const { hero, layout } = page;

	return (
		<article className="pt-16 pb-24">
			{/* Allows redirects for valid pages too */}
			<PayloadRedirects disableNotFound url={url} />

			<PageClient heroSection={hero.type} />

			<Hero {...hero} />
			<Blocks blocks={layout} />
		</article>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{
		slug: string;
	}>;
}): Promise<Metadata> {
	const { slug = "home" } = await params;

	const page = await queryPageBySlug({
		slug,
	});

	if (!page) {
		notFound();
	}

	return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection: "pages",
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
