<script lang="ts">
    import type { HeadingTree } from "@models/markdown";

    export let tree: HeadingTree[];
    export let level: 0 | 1 | 2 | 3 = 0;

    const listTypes = [
        "list-decimal",
        "list-lower-alpha",
        "list-lower-roman",
        "list-lower-greek"
    ];

    const nextLevel = level >= listTypes.length
        ? 0
        : level + 1;
</script>

<ol class={listTypes[level]}>
    {#each tree as node}
        <li>
            <a
                href={`#${node.value.slug}`}
                title={node.value.text}
                target="_self"
            >
                {node.value.text}
            </a>

            {#if node.children && node.children.length > 0}
                <svelte:self tree={node.children} level={nextLevel} />
            {/if}
        </li>
    {/each}
</ol>