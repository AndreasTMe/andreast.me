import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Link, Text } from "mdast";
import { visit } from "unist-util-visit";

interface Options {
    link?: {
        type: string;
        className: string;
        variants?: string[];
    }[];
    image?: {
        className: string;
    };
}

export function processMarkdownLinks(options?: Options): RemarkPlugin {
    return (tree) =>
        visit(tree, "link", (node: Link) => {
            if (!node.children) {
                return;
            }

            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];

                if (
                    child.type === "text" &&
                    options?.link &&
                    options.link.length > 0
                ) {
                    handleText(node, child, options);
                } else if (
                    child.type === "image" &&
                    options?.image?.className
                ) {
                    handleImage(node, options);
                }
            }
        });
}

function handleText(node: Link, text: Text, options: Options): void {
    const split = text.value.split("|");
    if (split.length !== 2) {
        throw new Error("Invalid link format. Expected 'config|text'.");
    }

    text.value = split[1];

    const config = split[0].split(",");
    if (config.length === 0 || config.length > 2) {
        throw new Error(
            "Invalid link configuration. Expected 'type|text' or 'type,variant|text'."
        );
    }

    const found = options.link?.find((l) => l.type === config[0]);
    if (!found) {
        throw new Error(`Link type '${config[0]}' not found in options.`);
    }

    node.data = {
        hProperties: {
            className: found.className
        }
    };

    if (config.length === 2 && found.variants) {
        if (!found.variants.includes(config[1])) {
            throw new Error(
                `Link variant '${config[1]}' not found in options.`
            );
        }

        node.data.hProperties = {
            ...node.data.hProperties,
            ["data-variant"]: config[1]
        };
    }
}

function handleImage(node: Link, options: Options): void {
    if (!options.image?.className) {
        return;
    }

    node.data = {
        hProperties: {
            className: options.image.className
        }
    };
}
