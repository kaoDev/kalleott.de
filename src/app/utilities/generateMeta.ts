import type { Metadata } from "next";
import type { Page, Post } from "../../payload-types";
import { getEnvServerUrl } from "./getEnvServerUrl";
import { mergeOpenGraph } from "./mergeOpenGraph";

export const generateMeta = async (args: {
  doc: Page | Post;
}): Promise<Metadata> => {
  const { doc } = args || {};

  const ogImage =
    typeof doc?.meta?.image === "object" &&
    doc.meta.image !== null &&
    "url" in doc.meta.image &&
    `${getEnvServerUrl()}${doc.meta.image.url}`;

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | Payload Website Template"
    : "Payload Website Template";

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description ?? undefined,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
