import { HotSauceDetails } from "@/(frontend)/chili-corner/[slug]/page";
import {
	DialogCloseBack,
	DialogContent,
	DialogNavBackOnClose,
	DialogOverlay,
} from "@/components/ui/dialog";

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export default async function HotSauceDetailsModal({ params }: Props) {
	return (
		<DialogNavBackOnClose open>
			<DialogOverlay />
			<DialogContent className="h-fit max-h-full max-w-4xl overflow-auto md:max-h-[90dvh]">
				<DialogCloseBack />
				<HotSauceDetails asDialog params={params} />
			</DialogContent>
		</DialogNavBackOnClose>
	);
}
