import { formatDateTime } from "@/utilities/formatDateTime";
import React from "react";
import type { Post } from "../../../payload-types";
import { Media } from "../../components/Media";

export const PostHero: React.FC<{
	post: Post;
}> = ({ post }) => {
	const { categories, populatedAuthors, publishedAt, title, hero } = post;

	return (
		<div className="relative -mt-[11.5rem] flex items-end">
			<div className="container relative z-10 pb-8 text-white lg:grid lg:grid-cols-[1fr_48rem_1fr]">
				<div className="col-span-1 col-start-1 md:col-span-2 md:col-start-2">
					<div className="mb-6 text-sm uppercase">
						{categories?.map((category, index) => {
							if (typeof category === "object" && category !== null) {
								const { title: categoryTitle } = category;

								const titleToUse = categoryTitle || "Untitled category";

								const isLast = index === categories.length - 1;

								return (
									<React.Fragment key={category.id}>
										{titleToUse}
										{!isLast && ",\u00A0"}
									</React.Fragment>
								);
							}
							return null;
						})}
					</div>

					<div className="">
						<h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
					</div>

					<div className="flex flex-col gap-4 md:flex-row md:gap-16">
						<div className="flex flex-col gap-4">
							{populatedAuthors && (
								<div className="flex flex-col gap-1">
									<p className="text-sm">Author</p>
									{populatedAuthors.map((author, index) => {
										const { name } = author;

										const isLast = index === populatedAuthors.length - 1;
										const secondToLast = index === populatedAuthors.length - 2;

										return (
											<React.Fragment key={author.id}>
												{name}
												{secondToLast && populatedAuthors.length > 2 && ", "}
												{secondToLast && populatedAuthors.length === 2 && " "}
												{!isLast && populatedAuthors.length > 1 && "and "}
											</React.Fragment>
										);
									})}
								</div>
							)}
						</div>
						{publishedAt && (
							<div className="flex flex-col gap-1">
								<p className="text-sm">Date Published</p>

								<time dateTime={publishedAt}>
									{formatDateTime(publishedAt)}
								</time>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="min-h-[80vh] select-none">
				{hero && typeof hero !== "string" && (
					<Media
						fill
						imgClassName="-z-10 object-cover hero-media-content"
						resource={hero}
						priority
					/>
				)}
				<div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
			</div>
		</div>
	);
};
