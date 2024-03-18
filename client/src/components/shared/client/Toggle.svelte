<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Icon from "@iconify/svelte";

    type Icon = {
        id: string;
        size: string;
    };

    export let toggled: boolean = false;
    export let leftIcon: Icon | undefined = undefined;
    export let rightIcon: Icon | undefined = undefined;

    const dispatch = createEventDispatcher();

    function toggle(e: MouseEvent | KeyboardEvent): void {
        toggled = !toggled;

        dispatch("toggle", {
            ...e.target,
            toggleState: toggled
        });
    }
</script>

<style lang="postcss">
    .toggle {
        @apply relative inline-block w-16 h-8;
    }

    .toggle > input {
        @apply opacity-0 w-0 h-0;
    }

    .slider {
        @apply absolute top-0 left-0 right-0 bottom-0 rounded-full
        bg-accent-color/100 cursor-pointer
        transition-[filter] duration-200 ease-linear
        shadow-[inset_0.1em_0.1em_0.3em_0_hsla(var(--default-shadow),0.4),inset_-0.1em_-0.1em_0.3em_0_hsla(var(--default-shadow-opposite),0.4)];
    }

    .slider:hover {
        @apply brightness-95 dark:brightness-110;
    }

    .slider:before {
        @apply absolute w-6 h-6 left-1 bottom-1 rounded-full bg-background-color/95 content-[""]
        shadow-[inset_0.1em_0.1em_0.3em_0_hsla(var(--default-shadow-opposite),0.4),inset_-0.1em_-0.1em_0.3em_0_hsla(var(--default-shadow),0.4),0.1em_0.1em_0.3em_0_hsla(var(--default-shadow),0.4)]
        transition-transform duration-200 ease-linear;
    }

    .slider:hover::before {
        @apply h-6 w-6 left-1 bottom-1;
    }

    .toggle > input:checked + .slider:before {
        @apply translate-x-8;
    }

    .left-icon,
    .right-icon {
        @apply absolute top-1 pointer-events-none text-text-opposite-color/80;
    }

    .left-icon {
        @apply left-1;
    }

    .right-icon {
        @apply right-1;
    }
</style>

<div class="toggle">
    <input type="checkbox" checked={toggled} />
    <span
        class="slider"
        role="button"
        tabindex="0"
        on:click|stopPropagation={toggle}
        on:keydown|stopPropagation={(e) => {
            if (e.key !== "Enter")
                return;

            toggle(e);
        }}
    ></span>
    {#if leftIcon && toggled}
        <span class="left-icon">
            <Icon icon={leftIcon.id} height={leftIcon.size} />
        </span>
    {/if}
    {#if rightIcon && !toggled}
        <span class="right-icon">
            <Icon icon={rightIcon.id} height={rightIcon.size} />
        </span>
    {/if}
</div>