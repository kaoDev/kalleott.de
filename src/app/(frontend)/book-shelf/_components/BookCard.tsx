import type { Category, Media as MediaType } from "src/payload-types";
import { Media } from "@/components/Media";
import {
	SimpleRichText,
	type SimpleRichTextContent,
} from "@/components/RichText/SimpleRichText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

namespace BookCard {
	export interface Props {
		image: MediaType | string | number;
		category?: Category | null;
		title: string;
		author: string;
		summary?: SimpleRichTextContent | null;
		link?: string | null;
	}
}

export function BookCard({
	author,
	category,
	summary,
	image,
	title,
	link,
}: BookCard.Props) {
	return (
		<div className="mx-auto max-w-prose p-4">
			<div className="sm:flex">
				<div className="sm:flex-shrink-0">
					<Media
						resource={image}
						className="h-48 w-full object-contain sm:h-full sm:w-48"
					/>
				</div>
				<div className="flex flex-col justify-between p-4 sm:p-6">
					<div>
						<h3 className="mb-2 text-xl font-semibold text-foreground">
							{title}
						</h3>
						<p className="mb-2 text-sm text-muted-foreground">by {author}</p>
						<Badge variant="secondary" className="mb-4">
							{category?.title}
						</Badge>
						{summary ? (
							<SimpleRichText
								enableGutter={false}
								enableProse={false}
								className="prose prose-lime mx-auto max-w-2xl dark:prose-invert prose-headings:underline prose-img:rounded-xl"
								content={summary}
							/>
						) : null}
					</div>
					<div>
						{link ? (
							<Button asChild className="mt-4 w-full">
								<a href={link} target="_blank">
									More information
								</a>
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
