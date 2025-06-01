<script lang="ts">
    import type { PortalProps } from "./props-types.js";
    import { untrack, type Snippet } from "svelte";
    import type { PortalState } from "./portal-state.svelte.js";
    import { BROWSER } from "esm-env";

    let { children, state }: PortalProps & { state: PortalState } = $props();

    if (BROWSER)
        $effect(() => {
            let snippet = children;
            untrack(() => state.addSnippet(snippet));

            return () => {
                untrack(() => state.removeSnippet(snippet));
            };
        });
</script>
