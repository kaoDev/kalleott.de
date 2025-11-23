import Link from "next/link";
import type { HotSauce } from "src/payload-types";
import { ImageMedia } from "@/components/Media/ImageMedia";
import { cn } from "@/utilities";

type Props = {
	title: string;
	image: HotSauce["heroImage"];
	tagLine: string | null | undefined;
	slug: string | null | undefined;
};

export function SaucePreview({ title, image, tagLine, slug }: Props) {
	return (
		<Link href={`/chili-corner/${slug}`} className="hover:underline">
			<div className="mb-5">
				<div className="relative aspect-square w-full">
					<ImageMedia
						fill
						resource={image}
						className={cn("rounded-xl shadow-sm", {
							"transition-shadow duration-200 hover:shadow-lg": slug,
						})}
						size={"(max-width: 768px) 100vw, (max-width: 1368px) 50vw, 616px"}
					/>
				</div>
			</div>
			<h3 className="blog-title mb-3 text-3xl leading-snug">{title}</h3>
			<p className="mb-4 text-lg leading-relaxed">{tagLine}</p>
		</Link>
	);
}
