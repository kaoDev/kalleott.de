import Link from "next/link";
import type { Media } from "src/payload-types";
import { CoverImage } from "./cover-image";
import { DateFormatter } from "./date-formatter";

type Props = {
	title: string;
	coverImage: number | Media | null | undefined;
	date: string;
	excerpt: string | null | undefined;
	slug: string;
	className?: string;
};

export function HeroPost({
	title,
	coverImage,
	date,
	excerpt,
	slug,
	className,
}: Props) {
	return (
		<section className={className}>
			<div className="mb-8 md:mb-16">
				{coverImage ? (
					<CoverImage title={title} src={coverImage} slug={slug} />
				) : null}
			</div>
			<div className="mb-10 md:mb-16 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
				<div>
					<h2 className="blog-title mb-4 mt-0 text-4xl leading-tight lg:text-5xl">
						<Link href={`/posts/${slug}`} className="hover:underline">
							{title}
						</Link>
					</h2>
					<div className="mb-4 text-lg md:mb-0">
						<DateFormatter dateString={date} />
					</div>
				</div>
				<div>
					<p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
				</div>
			</div>
		</section>
	);
}
