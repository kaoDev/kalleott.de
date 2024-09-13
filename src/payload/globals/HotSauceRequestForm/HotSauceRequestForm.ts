import type { GlobalConfig } from "payload";
import { authenticated } from "src/payload/access/authenticated";
import { authenticatedOrPublished } from "src/payload/access/authenticatedOrPublished";
import { FormBlock } from "src/payload/blocks/Form";

export const HotSauceRequestForm: GlobalConfig = {
	slug: "hot-sauce-order-form",
	access: {
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			name: "form",
			type: "blocks",
			blocks: [FormBlock],
		},
	],
};
