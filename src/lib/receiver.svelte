<script lang="ts">
    import type { ReceiverProps } from "./props-types.js";
    import type { PortalState } from "./portal-state.svelte.js";
    import { BROWSER } from "esm-env";

    let { placeholder, state }: ReceiverProps & { state: PortalState } = $props();
</script>

{#if BROWSER}
    {#if state.snippets.length === 0}
        {@render placeholder?.()}
    {/if}

    {#each state.snippets as snippet (snippet)}
        {@render snippet()}
    {/each}
{/if}
