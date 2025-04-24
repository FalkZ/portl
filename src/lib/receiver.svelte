<script lang="ts">
    import { type ChildrenSnippet, PortalState } from "./portal.svelte.js";
    import { BROWSER } from "esm-env";

    type Props = {
        placeholder?: ChildrenSnippet;
        state: PortalState;
    };

    let { placeholder, state }: Props = $props();
</script>

{#if BROWSER}
    {#if state.snippets.length === 0}
        {@render placeholder?.()}
    {/if}

    {#each state.snippets as snippet}
        {@render snippet()}
    {/each}
{/if}
