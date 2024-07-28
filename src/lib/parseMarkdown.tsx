import { compileMDX } from "next-mdx-remote/rsc";
import { Code } from "bright";
import cn from "classnames";
import Image from "next/image";
import path from "path";
import rehypeImageSize from "../../plugins/rehype-image-size.mjs";

export async function parseMarkdown(source: string) {
  const { content } = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          [rehypeImageSize, { root: path.join(process.cwd(), "public") }],
        ],
        format: "mdx",
      },
    },
    components: {
      pre: ({ children }) => {
        return <Code lineNumbers>{children}</Code>;
      },
      img: (props) => {
        const src = props.src ?? "";
        const isLocalImage = src.startsWith("/") || src.startsWith("./");
        const isSvg = src.endsWith(".svg");

        return isLocalImage && !isSvg ? (
          <Image
            src={src}
            alt={props.alt ?? ""}
            className={cn("m-auto object-contain shadow-sm")}
            sizes="(max-width: 672px) 100vw, 672px"
            {...props}
            height={(props.height as number) ?? 1080}
            width={(props.width as number) ?? 1080}
          />
        ) : (
          <img {...props} />
        );
      },
    },
  });

  return content;
}
