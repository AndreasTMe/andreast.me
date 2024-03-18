import { type Render, z } from "astro:content";
import type { Tree } from "@models/tree.ts";

export const BlogArticleSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number()
    }),
    categories: z.array(z.string()),
    wordCount: z.number(),
    createdDate: z.date(),
    lastModifiedDate: z.date().optional()
});

export type BlogArticle = {
    id: string;
    slug: string;
    body: string;
    collection: "blog";
    data: z.infer<typeof BlogArticleSchema>;
} & { render(): Render[".md"] };

export type BlogArticleMetadata = {
    slug: string;
} & z.infer<typeof BlogArticleSchema>;

export type BlogCategory = {
    name: string;
    count: number;
};

export type BlogCalendar = Tree;
