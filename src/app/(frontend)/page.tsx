import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Prose } from "@/components/Prose/Prose";
import { Container } from "./_components/container";
import { HeroPost } from "./_components/hero-post";
import { Intro } from "./_components/intro";
import { ToolBox } from "./_components/ToolBox";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Index() {
	return (
		<Container>
			<Intro />
			<RecentPost />
			<ToolBox />
		</Container>
	);
}

async function RecentPost() {
	const payload = await getPayload({ config: configPromise });

	// recent post from the last 6 months
	const minRecentDate = new Date();
	minRecentDate.setDate(minRecentDate.getDate() - 720);

	const allPosts = await payload.find({
		collection: "posts",
		depth: 1,
		limit: 1,
		sort: "-publishedAt",
		where: {
			publishedAt: {
				greater_than_equal: minRecentDate,
			},
			_status: {
				equals: "published",
			},
		},
	});

	const heroPost = allPosts.docs[0];

	if (!heroPost || !heroPost.slug) {
		return null;
	}

	return (
		<section className="mx-auto max-w-5xl">
			<Prose className="pb-6">
				<h2>Latest post</h2>
			</Prose>
			<HeroPost
				className="mx-auto max-w-2xl"
				title={heroPost.title}
				coverImage={heroPost.hero}
				date={heroPost.createdAt}
				slug={heroPost.slug}
				excerpt={heroPost.meta?.description}
			/>
		</section>
	);
}
