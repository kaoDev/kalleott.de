import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { exists } from "./utils";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  title: string;
  date: string;
}

interface IdPostMeta extends PostMeta {
  id: string;
}

export interface Post extends IdPostMeta {
  contentHtml: string;
}

function readMarkdownFile(dir: string, fileName: string): IdPostMeta {
  // Remove ".md" from file name to get id
  const id = getPostId(dir, fileName);

  // Read markdown file as string
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...(matterResult.data as PostMeta),
  };
}

export function getSortedPostsData(currentDir = postsDirectory): IdPostMeta[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(currentDir);
  const allPostsData = fileNames
    .map((fileName) => {
      const { isMarkdown, isDirectory } = checkPostFile(currentDir, fileName);

      if (isMarkdown && !isDirectory) {
        return readMarkdownFile(currentDir, fileName);
      } else if (isDirectory) {
        return getSortedPostsData(path.join(currentDir, fileName));
      }
    })
    .filter(exists)
    .flat();

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

function checkPostFile(currentDir: string, fileName: string) {
  const fullPath = path.join(currentDir, fileName);
  const isMarkdown = fileName.endsWith(".md");
  const isDirectory = fs.statSync(fullPath).isDirectory();

  return {
    isMarkdown,
    isDirectory,
  };
}

function getPostId(dir: string, fileName: string): string {
  const prefix =
    dir === postsDirectory ? "" : dir.replace(`${postsDirectory}/`, "");
  return path.join(prefix, fileName).replace(/\.md$/, "");
}

export function getAllPostIds(
  currentDir = postsDirectory
): Array<{ params: { id: string[] } }> {
  const fileNames = fs.readdirSync(currentDir);
  return fileNames
    .map((fileName) => {
      const { isMarkdown, isDirectory } = checkPostFile(currentDir, fileName);

      if (isMarkdown && !isDirectory) {
        const prefix =
          currentDir === postsDirectory
            ? ""
            : currentDir.replace(`${postsDirectory}/`, "");
        return {
          params: {
            id: getPostId(currentDir, fileName).split("/"),
          },
        };
      } else if (isDirectory) {
        return getAllPostIds(path.join(currentDir, fileName));
      }
    })
    .filter(exists)
    .flat();
}

export async function getPostData(id: string[]): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${path.join(...id)}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id: id.join("/"),
    contentHtml,
    ...(matterResult.data as PostMeta),
  };
}
