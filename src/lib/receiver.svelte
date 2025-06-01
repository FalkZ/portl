<script lang="ts">
    import type { Snippet } from "svelte";
    import type { PortalState } from "./portal-state.svelte.js";
    import { BROWSER } from "esm-env";

    type Props = {
        /**
         * Placeholder content to render when there are no portals.
         */
        placeholder?: Snippet;
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
