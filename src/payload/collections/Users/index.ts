import type { CollectionConfig } from "payload";
import { authenticated } from "../../access/authenticated";

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: authenticated,
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated,
	},
	admin: {
		defaultColumns: ["name", "email"],
		useAsTitle: "name",
	},
	auth: true,
	fields: [
		{
			name: "name",
			type: "text",
		},
		{
			name: "firstName",
			type: "text",
		},
		{
			name: "surName",
			type: "text",
		},
		{
			name: "picture",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "owner",
			type: "checkbox",
			defaultValue: false,
		},
	],
	timestamps: true,
};
