<script lang="ts">
    import { untrack, type Snippet } from "svelte";
    import type { PortalState } from "./portal-state.svelte.js";
    import { BROWSER } from "esm-env";

    type Props = {
        children?: Snippet;
        state: PortalState;
    };

    let { children, state }: Props = $props();

    if (BROWSER)
        $effect(() => {
            let snippet = children;
            untrack(() => state.addSnippet(snippet));

            return () => {
                untrack(() => state.removeSnippet(snippet));
            };
        });
</script>
