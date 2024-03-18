import { type Render, z } from "astro:content";

export const PolicySchema = z.object({
    title: z.string(),
    createdDate: z.date(),
    updatedDate: z.date().optional()
});

export type Policy = {
    id: string;
    slug: string;
    body: string;
    collection: "policy";
    data: z.infer<typeof PolicySchema>;
} & { render(): Render[".md"] };
