import type { MarkdownHeading } from "astro";

export type HeadingTree = {
    value: MarkdownHeading;
    children: HeadingTree[];
};
