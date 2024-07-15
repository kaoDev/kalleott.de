import Container from "@/components/container";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "./_components/header";
import { PostBody } from "./_components/post-body";
import { PostHeader } from "./_components/post-header";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug.join("/"));

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
          />
          <PostBody source={post.content || ""} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string[];
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug.join("/"));

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
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}
