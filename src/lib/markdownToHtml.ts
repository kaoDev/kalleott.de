import { serialize } from "next-mdx-remote/serialize";

export default async function markdownToHtml(markdown: string) {
  return await serialize(markdown);
}
