import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element } from "hast";
import { visit } from "unist-util-visit";

interface Options {
    domain: string;
}

export function processHtmlLinks(options?: Options): RehypePlugin {
    const websiteDomain = options?.domain ?? "";

    return (tree) =>
        visit(tree, (node) => {
            if (node.type !== "element") {
                return;
            }

            const element = node as Element;
            if (element.tagName !== "a") {
                return;
            }

            const href = element.properties?.href as string | undefined;
            if (!href) {
                return;
            }

            if (isExternalLink(href, websiteDomain)) {
                element.properties["target"] = "_blank";
                element.properties["rel"] = "noopener noreferrer";
            } else {
                element.properties["target"] = "_self";
            }
        });
}

function isExternalLink(href: string, domain: string) {
    return (
        !href.startsWith("/") && !href.startsWith("#") && !href.includes(domain)
    );
}
