import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { Container } from "./_components/container";
import { HeroPost } from "./_components/hero-post";
import { Intro } from "./_components/intro";
import Link from "next/link";
import { ToolBox } from "./_components/ToolBox";
import { Prose } from "@/components/Prose/Prose";

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
  const payload = await getPayloadHMR({ config: configPromise });

  // recent post from the last 6 months
  const minRecentDate = new Date();
  minRecentDate.setDate(minRecentDate.getDate() - 180);

  const allPosts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 1,
    sort: "-publishedAt",
    where: {
      publishedAt: {
        greater_than_equal: minRecentDate,
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
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.hero}
          date={heroPost.createdAt}
          slug={heroPost.slug}
          excerpt={heroPost.meta?.description}
        />
        <p>
          Read more in my <Link href="/posts">Blog</Link>
        </p>
      </Prose>
    </section>
  );
}
