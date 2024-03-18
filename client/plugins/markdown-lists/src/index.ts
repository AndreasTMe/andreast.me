import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { List, ListItem } from "mdast";
import { visit } from "unist-util-visit";

type OrderedListType = "1" | "a" | "i" | "A" | "I";
type UnorderedListType = "disc" | "circle" | "square";

interface Options {
    orderedListTypes?: OrderedListType[];
    unorderedListTypes?: UnorderedListType[];
}

const OL_TYPES: OrderedListType[] = [];
const UL_TYPES: UnorderedListType[] = [];

export default function processLists(options?: Options): RemarkPlugin {
    if (options?.orderedListTypes) {
        OL_TYPES.push(...options.orderedListTypes);
    } else {
        OL_TYPES.push("1");
    }

    if (options?.unorderedListTypes) {
        UL_TYPES.push(...options.unorderedListTypes);
    } else {
        UL_TYPES.push("disc");
    }

    return (tree) =>
        visit(tree, "list", (node: List, _, parent) => {
            if (parent?.type !== "root") {
                return;
            }

            node.data = {
                hProperties: {
                    type: node.ordered ? OL_TYPES[0] : UL_TYPES[0]
                }
            };

            processChildren(node.children as ListItem[], !!node.ordered, 1);
        });
}

function processChildren(
    listItems: ListItem[],
    parentIsOrdered: boolean,
    listTypeIndex: number
) {
    for (const listItem of listItems) {
        if (
            !listItem.children ||
            listItem.children.length === 0 ||
            listItem.children.every((child) => child.type !== "list")
        ) {
            continue;
        }

        const lists = listItem.children.filter(
            (child) => child.type === "list"
        ) as List[];

        for (const list of lists) {
            const isSameType = list.ordered === parentIsOrdered;
            const maxIndex = list.ordered ? OL_TYPES.length : UL_TYPES.length;
            const index =
                isSameType && listTypeIndex < maxIndex ? listTypeIndex : 0;

            list.data = {
                hProperties: {
                    type: list.ordered ? OL_TYPES[index] : UL_TYPES[index]
                }
            };

            if (isSameType) {
                processChildren(
                    list.children as ListItem[],
                    parentIsOrdered,
                    index < 2 ? index + 1 : 0
                );
            } else {
                processChildren(
                    list.children as ListItem[],
                    !parentIsOrdered,
                    1
                );
            }
        }
    }
}
