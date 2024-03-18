<script lang="ts">
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    export let label: string;
    export let type: "button" | "reset" | "submit" = "button";
    export let icon: string | undefined = undefined;
    export let iconPosition: "left" | "right" = "left";
    export let disabled: boolean = false;

    const dispatch = createEventDispatcher();
</script>

<style lang="postcss">
    .enhanced-button {
        @apply min-w-28 py-3 px-6 flex items-center gap-2
        border-0 rounded outline-0
        text-text-color/100 bg-accent-color/100
        text-center font-secondary text-base select-none;
    }

    .enhanced-button:hover {
        @apply brightness-95 scale-105;
    }

    .enhanced-button:active {
        @apply transition-transform scale-95 duration-100 ease-in;
    }

    .enhanced-button:hover:active {
        @apply opacity-90;
    }

    .enhanced-button:disabled,
    .enhanced-button:disabled:active {
        @apply cursor-not-allowed text-background-color/100
        transform-none transition-none brightness-95;
    }

    .enhanced-button:disabled:hover:active {
        @apply opacity-100;
    }

    .icon {
        @apply text-[24px];
    }

    @media screen and (max-width: 768px) {
        .enhanced-button {
            @apply transition-none;
        }

        .enhanced-button:hover {
            @apply transition-none;
        }
    }
</style>

<button
    class="enhanced-button at-box-shadow-transition"
    type={type}
    disabled={disabled}
    aria-disabled={disabled}
    on:click|stopPropagation={(e) => {
        if (disabled)
            return;

        dispatch('click', {
            ...e.target
        });
    }}
>
    {#if icon && iconPosition === "left"}
        <span class="icon"><Icon icon={icon} /></span>
    {/if}
    <span>{label}</span>
    {#if icon && iconPosition === "right"}
        <span class="icon"><Icon icon={icon} /></span>
    {/if}
</button>

