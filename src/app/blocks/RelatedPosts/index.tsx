import { PostPreview } from "@/(frontend)/_components/post-preview";
import { cn } from "@/utilities";
import React from "react";
import { RichText } from "src/app/components/RichText";
import type { Post } from "../../../payload-types";

export type RelatedPostsProps = {
  className?: string;
  docs?: Post[];
  introContent?: any;
};

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props;

  if (!docs || docs.length === 0) return null;

  return (
    <div className={cn("container", className)}>
      {introContent && <RichText content={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {docs.map((post) => {
          return (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.hero}
              date={post.publishedAt}
              slug={post.slug!}
              excerpt={post.meta?.description}
            />
          );
        })}
      </div>
    </div>
  );
};
