<script lang="ts">
    import { untrack } from "svelte";
    import { type ChildrenSnippet, PortalState } from "./portal.svelte.js";

    type Props = {
        children?: ChildrenSnippet;
        state: PortalState;
    };

    let { children, state }: Props = $props();

    $effect(() => {
        let snippet = children;
        untrack(() => state.addSnippet(snippet));

        return () => {
            untrack(() => state.removeSnippet(snippet));
        };
    });
</script>
