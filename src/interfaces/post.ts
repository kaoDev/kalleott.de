import { z } from 'zod'

export const postMetaData = z.object({
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  coverImage: z.string(),
  ogImage: z
    .object({
      url: z.string().optional(),
    })
    .optional(),
  course: z.string().optional(),
  draft: z.boolean().default(false),
  excerpt: z.string(),
  tags: z.string().optional(),
})

export interface Post {
  slug: string
  content: string
  metaData: z.infer<typeof postMetaData>
}
