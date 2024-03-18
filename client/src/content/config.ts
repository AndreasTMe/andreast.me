import { defineCollection } from "astro:content";
import { BlogArticleSchema } from "@models/blog.ts";
import { PolicySchema } from "@models/policies.ts";

const blogCollection = defineCollection({
    type: "content",
    schema: BlogArticleSchema
});

const policyCollection = defineCollection({
    type: "content",
    schema: PolicySchema
});

export const collections = {
    blog: blogCollection,
    policy: policyCollection
};
