import type { StaticImageData } from "next/image";
import type React from "react";
import { RichText } from "src/app/components/RichText";
import { Media } from "@/components/Media";
import { cn } from "@/utilities/cn";
import type { Media as MediaType, Page } from "../../../payload-types";

type Props = Extract<Page["layout"][0], { blockType: "mediaBlock" }> & {
	breakout?: boolean;
	captionClassName?: string;
	className?: string;
	enableGutter?: boolean;
	id?: string;
	imgClassName?: string;
	staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
	const {
		captionClassName,
		className,
		enableGutter = true,
		imgClassName,
		media,
		position = "default",
		staticImage,
	} = props;

	let caption: MediaType["caption"] = null;

	if (media && typeof media === "object") caption = media.caption;

	return (
		<div
			className={cn(
				"",
				{
					container: position === "default" && enableGutter,
				},
				className,
			)}
		>
			{position === "fullscreen" && (
				<div className="relative">
					<Media resource={media} src={staticImage} />
				</div>
			)}
			{position === "default" && (
				<Media
					imgClassName={cn("rounded", imgClassName)}
					resource={media}
					src={staticImage}
				/>
			)}
			{caption && (
				<div
					className={cn(
						"mt-6",
						{
							container: position === "fullscreen",
						},
						captionClassName,
					)}
				>
					<RichText content={caption} enableGutter={false} />
				</div>
			)}
		</div>
	);
};
