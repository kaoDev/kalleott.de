import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/(frontend)/_components/ui/carousel";
import { FormBlock } from "@/blocks/Form";
import { ImageMedia } from "@/components/Media/ImageMedia";
import { Prose } from "@/components/Prose/Prose";
import { RichText } from "@/components/RichText";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getCachedGlobal } from "@/utilities/getGlobals";
import configPromise from "@payload-config";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import type { HotSauceOrderForm } from "src/payload-types";

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default function HotSauceDetailsPage({ params }: PageProps) {
	return <HotSauceDetails params={params} />;
}

interface Props extends PageProps {
	asDialog?: boolean;
}

export async function HotSauceDetails({ params, asDialog }: Props) {
	const payload = await getPayload({ config: configPromise });

	const { slug } = await params;

	const sauceResult = await payload.find({
		collection: "hot-sauces",
		where: {
			slug: {
				equals: slug,
			},
		},
		depth: 1,
	});

	const sauce = sauceResult.docs[0];

	if (!sauce) {
		notFound();
	}

	const requestFormConfig: HotSauceOrderForm = await getCachedGlobal(
		"hot-sauce-order-form",
		1,
	)();

	const requestHotSauceForm = requestFormConfig.form?.[0];

	const sauceNameElement = asDialog ? (
		<DialogTitle asChild>
			<h1>{sauce.name}</h1>
		</DialogTitle>
	) : (
		<h1>{sauce.name}</h1>
	);

	const sauceDescriptionElement = asDialog ? (
		<DialogDescription asChild>
			<p>{sauce.tagLine}</p>
		</DialogDescription>
	) : (
		<p>{sauce.tagLine}</p>
	);

	return (
		<>
			<Prose>
				{sauceNameElement}
				{sauceDescriptionElement}
				{sauce.gallery && sauce.gallery.length > 0 ? (
					<Carousel>
						<CarouselContent>
							{sauce.gallery.map((image, index) => (
								<CarouselItem
									key={`${image.id}-${index}`}
									className="relative flex items-center"
								>
									<ImageMedia
										resource={image["gallery-image"]}
										size="(max-width: 42rem) 100vw, 42rem"
										className=""
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				) : (
					<ImageMedia resource={sauce.heroImage} />
				)}
				<RichText content={sauce.description} />
				<h2>Ingredients</h2>
				<ul>
					{sauce.ingredients?.map((ingredient, index) => (
						// biome-ignore lint: the position is static so index as key is fine
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				{requestHotSauceForm ? (
					<FormBlock
						form={requestHotSauceForm.form as unknown as FormType}
						id={"hot-sauce-order-form"}
						enableIntro
					/>
				) : null}
			</Prose>
			<div className="p-20" />
		</>
	);
}
