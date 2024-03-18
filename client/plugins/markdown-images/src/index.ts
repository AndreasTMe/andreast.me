import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Image } from "mdast";
import { visit } from "unist-util-visit";

interface Options {
    classes?: {
        figure?: string;
        image?: string;
        caption?: string;
        link?: string;
    };
}

export default function processImages(options?: Options): RemarkPlugin {
    return (tree) =>
        visit(tree, "image", (node: Image) => {
            const src = node.url;
            if (!src.match("\\.(jpeg|jpg|gif|png|webp|svg)$")) {
                return;
            }

            if (!node.alt) {
                return;
            }

            const alt = node.alt;
            const figureClass = options?.classes?.figure
                ? `class=${options?.classes?.figure}`
                : "";
            const imageClass = options?.classes?.image
                ? `class=${options?.classes?.image}`
                : "";
            const captionClass = options?.classes?.caption
                ? `class=${options?.classes?.caption}`
                : "";
            const linkClass = options?.classes?.link
                ? `class=${options?.classes?.link}`
                : "";

            Object.assign(node, {
                type: "html",
                value: `<figure ${figureClass}>
                            <img
                                ${imageClass}
                                src=${src}
                                alt="${alt}"
                                title="${alt}"
                                loading="lazy"
                                decoding="async"
                            />
                            <figcaption ${captionClass}>
                                <span>${alt}</span>
                                <span>&nbsp;•</span>
                                <a 
                                    ${linkClass}
                                    href="${src}"
                                    title="Open image in a new tab" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in a new tab
                                </a>
                            </figcaption>
                        </figure>`
            });
        });
}
