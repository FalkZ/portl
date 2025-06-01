// Exporting these props types directly from `<script module>` does currently not work.
// That's why they are here for now.
// This is probably related to this bug: https://github.com/sveltejs/language-tools/issues/2555

import type { Snippet } from "svelte";

export type ReceiverProps = {
    /**
     * Placeholder content to render when there are no portals.
     */
    placeholder?: Snippet;
};

export type PortalProps = {
    children?: Snippet;
};
