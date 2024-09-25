import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Books: CollectionConfig = {
	slug: "books",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "link",
			type: "text",
			required: true,
		},
		{
			name: "author",
			type: "text",
			required: true,
		},
		{
			name: "summary",
			type: "richText",
			required: true,
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
			required: true,
		},
		{
			name: "readingDate",
			type: "date",
			required: true,
		},
		{
			name: "priority",
			type: "number",
			required: true,
		},
	],
};
