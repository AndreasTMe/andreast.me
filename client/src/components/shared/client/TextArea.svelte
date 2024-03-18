<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { IdGenerator } from "@utils/hash";

    export let label: string = "";
    export let placeholder: string = "";
    export let value: string = "";
    export let rows: number = 3;
    export let min: number = 2;
    export let max: number = 80;
    export let required: boolean = false;
    export let displayErrors: boolean = false;

    const dispatch = createEventDispatcher();

    const id = IdGenerator.generateId();
    let errors: string[] = [];

    const actualMin = min && min > 1 ? min : 2;
    const actualMax = max && max > actualMin ? max : 500;

    function handleChange(event: Event): void {
        const target = event.target as HTMLTextAreaElement;
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

    .container > textarea {
        @apply px-3 py-2 border-2 border-solid border-transparent rounded
        box-border outline-0 text-text-color font-secondary text-base
        transition-[border-color] duration-200 ease-linear;
    }

    .container > textarea:focus {
        @apply border-text-color/60;
    }

    .error_container {
        @apply flex flex-col mt-1 font-bold;
    }

    .error_container > span {
        /*@apply text-error;*/
    }
</style>

<div class="container">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        on:change|stopPropagation={handleChange}
    />

    {#if displayErrors && errors.length > 0}
        <div class="error_container">
            {#each errors as error}
                <span>{error}</span>
            {/each}
        </div>
    {/if}
</div>