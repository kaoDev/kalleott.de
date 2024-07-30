import { Post, postMetaData } from "@/interfaces/post";
import { globSync } from "glob";
import matter from "gray-matter";
import path from "path";
import fs from "node:fs/promises";

const postsDirectory = path.join(process.cwd(), "_posts");

function getPostSlugs() {
  return globSync(["**/*.mdx", "**/*.md"], { cwd: postsDirectory });
}

export async function getPostBySlug(slug: string) {
  const webSlug = slug.replace(/\.mdx?$/gim, "");

  const possiblePaths = [
    path.join(postsDirectory, `${webSlug}.mdx`),
    path.join(postsDirectory, `${webSlug}.md`),
  ];

  let blogPath: string | undefined;

  for (const filePath of possiblePaths) {
    try {
      const fileStat = await fs.stat(filePath);
      if (fileStat.isFile()) {
        blogPath = filePath;
        break;
      }
    } catch {
      continue;
    }
  }

  if (!blogPath) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fileContents = await fs.readFile(blogPath, "utf8");

  const { data, content } = matter(fileContents);

  const metaData = postMetaData.parse(data);

  return { content, slug: webSlug, metaData };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();

  const posts: Post[] = [];

  for (const slug of slugs) {
    posts.push(await getPostBySlug(slug));
  }

  posts.sort((post1, post2) =>
    post1.metaData.createdAt > post2.metaData.createdAt ? -1 : 1,
  );

  return posts;
}
