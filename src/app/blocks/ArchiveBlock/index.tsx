import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import React from "react";
import { RichText } from "src/app/components/RichText";
import type { Post } from "src/payload-types";
import { CollectionArchive } from "../../components/CollectionArchive";
import type { ArchiveBlockProps } from "./types";

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const { id, categories, introContent, limit, populateBy, selectedDocs } =
    props;

  let posts: Post[] = [];

  if (populateBy === "collection") {
    const payload = await getPayloadHMR({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      depth: 1,
      limit: limit ?? 3,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    posts = fetchedPosts.docs;
  } else {
    posts =
      selectedDocs
        ?.map((post) => {
          if (typeof post.value === "object") return post.value;
        })
        .filter((post) => post != null) ?? [];
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem]"
            content={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  );
};
