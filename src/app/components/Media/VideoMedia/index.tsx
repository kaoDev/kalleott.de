"use client";

import { cn } from "@/utilities/cn";
import type React from "react";
import { useEffect, useRef } from "react";
import type { Props as MediaProps } from "../types";

export const VideoMedia: React.FC<MediaProps> = (props) => {
	const { resource, videoClassName } = props;

	const videoRef = useRef<HTMLVideoElement>(null);
	// const [showFallback] = useState<boolean>()

	useEffect(() => {
		const { current: video } = videoRef;
		if (video) {
			video.addEventListener("suspend", () => {
				// setShowFallback(true);
				// console.warn('Video was suspended, rendering fallback image.')
			});
		}
	}, []);

	if (resource && typeof resource === "object") {
		const { filename } = resource;

		return (
			<video
				autoPlay
				className={cn(videoClassName)}
				controls={false}
				loop
				muted
				playsInline
				ref={videoRef}
			>
				<source
					src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
				/>
			</video>
		);
	}

	return null;
};
