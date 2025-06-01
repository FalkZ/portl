<script lang="ts">
    import { BROWSER } from "esm-env";
    import { untrack } from "svelte";
    import type { PortalState } from "./portal-state.svelte.js";
    import type { PortalProps } from "./props-types.js";

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
