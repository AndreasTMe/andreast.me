<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { IdGenerator } from "@utils/hash";

    export let label: string = "";
    export let placeholder: string = "";
    export let value: string = "";
    export let type: "text" | "email" = "text";
    export let min: number = 2;
    export let max: number = 80;
    export let required: boolean = false;
    export let displayErrors: boolean = false;

    const dispatch = createEventDispatcher();

    const actualMin = min && min > 1 ? min : 2;
    const actualMax = max && max > actualMin ? max : 80;

    const id = IdGenerator.generateId();
    let errors: string[] = [];

    function isEmail(type: "text" | "email"): boolean {
        return type === "email";
    }

    function handleChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        errors = [];

        if (required && !inputValue) {
            errors.push("This field is required.");
        }

        if (!inputValue) {
            value = "";
            dispatch("change", { value, errors });

            return;
        }

        value = inputValue;

        if (inputValue.length < actualMin) {
            errors.push(`This field must be at least ${actualMin} characters.`);
        }

        if (inputValue.length > actualMax) {
            errors.push(`This field must be at most ${actualMax} characters.`);
        }

        if (isEmail(type) && !inputValue.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g)) {
            errors.push("This field must be a valid email address.");
        }

        dispatch("change", { value, errors });
    }
</script>

<style lang="postcss">
    .container {
        @apply flex flex-col;
    }

    .container label {
        @apply font-bold;
    }

    .container > input {
        @apply px-3 py-2 border-2 border-solid border-transparent rounded
        box-border outline-0 text-text-color font-secondary text-base
        transition-[border-color] duration-200 ease-linear;
    }

    .container > input:focus {
        @apply border-text-color/60;
    }

    .icon {
        @apply w-8 h-[5.5rem] absolute ml-1
        flex justify-center items-center text-[1.5rem] text-text-color font-bold;
    }

    .error_container {
        @apply flex flex-col mt-1 font-bold;
    }

    .error_container > span {
        /*@apply text-error;*/
    }

    @media screen and (max-width: 768px) {
        .icon {
            @apply h-[4.5rem];
        }
    }
</style>

<div class="container">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <input
        id={id}
        style="padding-left: {isEmail(type) ? '2rem' : 'auto'}"
        placeholder={placeholder}
        value={value}
        on:change|stopPropagation={handleChange}
    />

    {#if isEmail(type)}
        <span class="icon">@</span>
    {/if}

    {#if displayErrors && errors.length > 0}
        <div class="error_container">
            {#each errors as error}
                <span>{error}</span>
            {/each}
        </div>
    {/if}
</div>