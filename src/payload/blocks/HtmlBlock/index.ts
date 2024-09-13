import type { Block } from "payload";

export const HtmlBlock: Block = {
	slug: "html",
	fields: [
		{
			name: "code",
			type: "code",
			label: false,
			required: true,
		},
	],
};
