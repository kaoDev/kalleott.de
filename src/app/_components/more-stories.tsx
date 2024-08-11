import { Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";

type Props = {
  posts: Post[];
  title?: string;
};

export function MoreStories({ posts, title }: Props) {
  const postsList = (
    <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.metaData.title}
          coverImage={post.metaData.coverImage}
          date={post.metaData.createdAt}
          slug={post.slug}
          excerpt={post.metaData.excerpt}
        />
      ))}
    </div>
  );

  if (title) {
    return (
      <section>
        <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-7xl">
          {title}
        </h2>
        {postsList}
      </section>
    );
  }

  return postsList;
}
