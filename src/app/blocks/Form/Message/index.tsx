import { SimpleRichText } from "@/components/RichText/SimpleRichText";
import type { MessageField } from "@payloadcms/plugin-form-builder/types";
import { Width } from "../Width";

export const Message: React.FC<MessageField> = ({ message }) => {
	return (
		<Width className="my-12" width="100">
			<SimpleRichText content={message} />
		</Width>
	);
};
