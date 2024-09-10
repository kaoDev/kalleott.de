import { PostPreview } from "@/(frontend)/_components/post-preview";
import { cn } from "@/utilities/cn";
import React from "react";
import type { Post } from "../../../payload-types";

export type Props = {
  posts: Post[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props;

  return (
    <div className={cn("container")}>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.hero}
            date={post.publishedAt}
            slug={post.slug!}
            excerpt={post.meta?.description}
          />
        ))}
      </div>
    </div>
  );
};
