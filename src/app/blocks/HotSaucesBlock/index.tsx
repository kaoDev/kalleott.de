import { SaucePreview } from "@/(frontend)/_components/sauce-preview";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import type React from "react";
import { RichText } from "src/app/components/RichText";
import type { HotSauce } from "src/payload-types";
import type { HotSaucesBlockProps } from "./types";

export const HotSaucesBlock: React.FC<
	HotSaucesBlockProps & {
		id?: string;
	}
> = async (props) => {
	const { id, introContent, limit, populateBy, selectedDocs } = props;

	let sauces: HotSauce[] = [];

	if (populateBy === "collection") {
		const payload = await getPayload({ config: configPromise });

		const fetchedSauces = await payload.find({
			collection: "hot-sauces",
			sort: "-cookedAt",
			depth: 1,
			limit: limit ?? 20,
		});

		sauces = fetchedSauces.docs;
	} else {
		sauces =
			selectedDocs
				?.map((sauce) => {
					if (typeof sauce.value === "object") return sauce.value;
				})
				.filter((sauce) => sauce != null) ?? [];
	}

	return (
		<div className="my-16" id={`block-${id}`}>
			{introContent && (
				<div className="container mb-16">
					<RichText
						className="mx-auto max-w-[48rem]"
						content={introContent}
						enableGutter={false}
					/>
				</div>
			)}
			<div className={"container"}>
				<div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:grid-cols-3">
					{sauces.map((sauce) => (
						<SaucePreview
							key={sauce.slug}
							title={sauce.name}
							image={sauce.heroImage}
							slug={sauce.slug}
							tagLine={sauce.tagLine}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
