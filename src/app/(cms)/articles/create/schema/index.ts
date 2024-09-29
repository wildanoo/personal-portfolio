import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(2).max(255),
  content: z.string().min(2),
  excerpt: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
  metaTitle: z.string().max(255),
  metaDescription: z.string().max(255),
  metaKeywords: z.string().max(255),
  featuredImage: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
  authorId: z.string().min(2).max(255),
  categoryId: z.string().min(2).max(255),
  status: z.enum(["PUBLISHED", "DRAFT", "PENDING"]),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  publishedOn: z.date(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
});