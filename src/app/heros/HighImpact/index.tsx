import React from "react";
import type { Page } from "../../../payload-types";
import { CMSLink } from "../../components/Link";
import { Media } from "../../components/Media";
import { RichText } from "../../components/RichText";

export const HighImpactHero: React.FC<Page["hero"]> = ({
	links,
	media,
	richText,
}) => {
	return (
		<div
			className="relative -mt-[11.5rem] flex items-end text-white"
			data-theme="dark"
		>
			<div className="container relative z-10 mb-8">
				<div className="max-w-[34rem]">
					<RichText className="mb-6" content={richText} enableGutter={false} />
					{Array.isArray(links) && links.length > 0 && (
						<ul className="flex gap-4">
							{links.map(({ link }, i) => {
								return (
									<li key={`${link.url}-${i}`}>
										<CMSLink {...link} />
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>
			<div className="min-h-[80vh] select-none">
				{typeof media === "object" && (
					<React.Fragment>
						<Media
							fill
							imgClassName="-z-10 object-cover"
							priority
							resource={media}
						/>
						<div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black to-transparent" />
					</React.Fragment>
				)}
			</div>
		</div>
	);
};
