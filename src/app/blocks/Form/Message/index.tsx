import {
	SimpleRichText,
	type SimpleRichTextContent,
} from "@/components/RichText/SimpleRichText";
import { Width } from "../Width";

export interface Props {
	message: SimpleRichTextContent;
}

export function Message({ message }: Props) {
	return (
		<Width className="my-12" width="100">
			<SimpleRichText content={message} />
		</Width>
	);
}
