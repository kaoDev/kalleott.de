import { getAllPosts } from "@/lib/api";
import { MetadataRoute } from "next";

const baseUrl = "https://kalleott.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/chili-corner`,
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.metaData.updatedAt
        ? new Date(post.metaData.updatedAt)
        : new Date(post.metaData.createdAt),
      priority: 0.7,
    })),
  ];
}
