import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "src/payload/access/authenticatedOrPublished";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "startedAt", "completedAt"],
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
      name: "client",
      type: "text",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "startedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "completedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "richText",
    },
    { name: "link", type: "text" },
    {
      name: "tags",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "competencies",
    },
  ],
  timestamps: true,
};
