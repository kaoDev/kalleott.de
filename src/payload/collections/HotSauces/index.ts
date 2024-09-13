import type { CollectionConfig } from "payload";
import { authenticatedOrPublished } from "src/payload/access/authenticatedOrPublished";
import { slugField } from "src/payload/fields/slug";
import { authenticated } from "../../access/authenticated";

export const HotSauces: CollectionConfig = {
	slug: "hot-sauces",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "cookedAt"],
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "tagLine",
			type: "text",
		},
		{
			name: "heroImage",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "description",
			type: "richText",
		},
		{
			name: "ingredients",
			type: "text",
			hasMany: true,
		},
		{
			name: "heatLevel",
			type: "number",
		},
		{
			name: "gallery",
			type: "array",
			label: "Gallery",
			minRows: 0,
			maxRows: 10,
			labels: {
				singular: "Image",
				plural: "Images",
			},
			fields: [
				{
					name: "gallery-image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		slugField(),
		{
			name: "cookedAt",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
	],
	timestamps: true,
};
