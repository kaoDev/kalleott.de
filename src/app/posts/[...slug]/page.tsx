import { NestedPage } from "@/components/nested-page";
import { Prose } from "@/components/prose";
import {
  SubscribeToUpdatesForm,
  SubscribeToUpdatesFormWithoutText,
} from "@/components/subscribe-to-updates-form";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBody } from "./_components/post-body";
import { PostHeader } from "./_components/post-header";

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug.join("/"));

  if (!post) {
    return notFound();
  }

  return (
    <NestedPage backHref="/#blog" backTitle="Blog">
      <article className="mb-32">
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
        />
        <PostBody source={post.content || ""} />
      </article>

      <section id="mailing-list" className="mb-32">
        <Prose>
          <h2>Mailing List</h2>
          <p>
            Enjoyed this post? Leave your email below to get notified when I
            post new content.
          </p>
          <SubscribeToUpdatesFormWithoutText />
        </Prose>
      </section>
    </NestedPage>
  );
}

type Params = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug.join("/"));

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Kalle's Blog.`;

  return {
    title,
    openGraph: {
      title,
      images: post.ogImage?.url ? [post.ogImage?.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}
