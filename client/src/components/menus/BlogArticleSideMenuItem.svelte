<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Icon from "@iconify/svelte";

    export let icon: string;
    export let iconClass: string = "";
    export let flip: "horizontal" | "vertical" | undefined = undefined;
    export let isLink: boolean = false;
    export let href: string = "";
    export let alt: string = "";
    export let isExternal: boolean = false;
    export let isNewTab: boolean = false;

    const dispatch = createEventDispatcher();
    const iconSize = "34px";
</script>

<style lang="postcss">
    .icon-container {
        @apply m-1 border-1 rounded border-background-opposite-color/20
        flex items-center justify-center decoration-0;
    }

    .icon {
        @apply cursor-pointer text-text-color/80;
    }

    .icon:hover {
        @apply scale-105
        shadow-[0_0_10px_0_hsla(var(--accent-shadow),1)]
        dark:shadow-[0_0_16px_0_hsla(var(--accent-shadow),0.6)];
    }

    .icon:active {
        @apply transition-transform scale-95 duration-100 ease-in;
    }
</style>

{#if isLink}
    <a
        class="icon-container"
        href={href}
        title={alt}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isNewTab ? "_blank" : "_self"}
        aria-label={alt}
    >
        <span class="icon">
            <Icon
                class={iconClass}
                icon={icon}
                height={iconSize}
                width={iconSize}
                flip={flip}
            />
        </span>
    </a>
{:else}
    <button
        class="icon-container"
        title={alt}
        on:click|stopPropagation={(e) => {
            dispatch('click', {
                ...e.target
            });
        }}
    >
        <span class="icon">
            <Icon
                class={iconClass}
                icon={icon}
                height={iconSize}
                width={iconSize}
                flip={flip}
            />
        </span>
    </button>
{/if}