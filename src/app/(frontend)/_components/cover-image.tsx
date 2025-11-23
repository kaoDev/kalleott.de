import configPromise from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import type { Media } from "src/payload-types";
import { ImageMedia } from "@/components/Media/ImageMedia";
import { cn } from "@/utilities";

type Props = {
	title: string;
	src: number | Media;
	slug?: string | null;
	small?: boolean;
};

async function ensureMedia(src: number | Media) {
	if (typeof src === "number") {
		const payload = await getPayload({ config: configPromise });

		const media = await payload.findByID({
			collection: "media",
			id: src,
		});

		return media;
	}

	return src;
}

export async function CoverImage({ title, src, slug, small }: Props) {
	const media = await ensureMedia(src);

	if (!media.url) {
		return null;
	}

	const image = (
		<ImageMedia
			resource={media}
			alt={`Cover Image for ${title}`}
			className={cn("blog-cover-image w-full rounded-xl shadow-sm", {
				"transition-shadow duration-200 hover:shadow-lg": slug,
			})}
			priority={!small}
			size={
				small
					? "(max-width: 768px) 100vw, (max-width: 1368px) 50vw, 616px"
					: "(max-width: 672px) 100vw, 672px"
			}
		/>
	);
	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
