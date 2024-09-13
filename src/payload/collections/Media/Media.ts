import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { anyone } from "../../access/anyone";
import { authenticated } from "../../access/authenticated";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
			admin: {
				components: {
					beforeInput: [
						{
							path: "/payload/collections/Media/AltTextEditor#AltTextEditor",
						},
					],
				},
			},
		},
		{
			name: "caption",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
		},
	],
	upload: {
		crop: true,
		focalPoint: true,
		displayPreview: true,
		imageSizes: [
			{
				name: "thumbnail",
				width: 256,
				height: undefined,
			},
			{
				name: "medium",
				width: 512,
				height: undefined,
			},
			{
				name: "large",
				width: 1024,
				height: undefined,
			},
			{
				name: "xl",
				width: 1920,
				height: undefined,
			},
			{
				name: "xxl",
				width: 2560,
				height: undefined,
			},
			{
				name: "xxxl",
				width: 3840,
				height: undefined,
			},
		],
		adminThumbnail: "thumbnail",
	},
};
