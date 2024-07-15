import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import Container from "@/components/container";
import { Post } from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";
import { differenceInMonths } from "date-fns";
import Link from "next/link";

export default function Index() {
  const allPosts = getAllPosts();

  const currentData = new Date();

  const currentPosts: Post[] = [];
  const writingsFromThePast: Post[] = [];

  for (const post of allPosts) {
    // show posts from the last 3 years as relevant
    const diff = differenceInMonths(currentData, new Date(post.date));
    if (diff <= 36) {
      currentPosts.push(post);
    } else {
      writingsFromThePast.push(post);
    }
  }

  const heroPost = currentPosts[0];
  const morePosts = currentPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <section className="my-16">
          <p className="text-lg md:text-2xl">
            A side project of me is cooking hot sauces,{" "}
            <Link className="hover:underline" href="/hotsauces">
              check it out here
            </Link>
            !
          </p>
        </section>
        <h2
          id="blog"
          className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl"
        >
          Blog
        </h2>
        <p className="mb-12 text-lg md:pr-8 md:text-2xl">
          The blog cover images are made with ChatGPT using the blog post or
          title as input, have fun exploring for weird stuff!
        </p>
        {heroPost ? (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        ) : null}
        {morePosts.length > 0 && (
          <MoreStories posts={morePosts} title="More Stories" />
        )}
        {writingsFromThePast.length > 0 && (
          <MoreStories
            title="Writings from the past"
            posts={writingsFromThePast}
          />
        )}
      </Container>
    </main>
  );
}
