export type TreeEntry = {
    value: string;
    order: number;
    isExpanded: boolean;
    href?: string;
    children?: TreeEntry[];
};

export type Tree = TreeEntry[];
