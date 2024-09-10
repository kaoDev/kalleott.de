import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "src/payload/access/authenticatedOrPublished";

export const Competencies: CollectionConfig = {
  slug: "competencies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "categories",
      type: "relationship",
      hasMany: true,
      required: true,
      relationTo: "categories",
    },
  ],
  timestamps: true,
};
