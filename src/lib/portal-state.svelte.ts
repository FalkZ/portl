import type { Component, Snippet } from "svelte";
import Portal from "./portal.svelte";
import type { PortalProps, ReceiverProps } from "./props-types.js";
import Receiver from "./receiver.svelte";

export class PortalState {
    snippets: Snippet[] = $state([]);

    addSnippet(snippet?: Snippet) {
        if (snippet) {
            this.snippets.push(snippet);
        }
    }

    removeSnippet(snippet?: Snippet) {
        if (snippet) {
            let index = this.snippets.indexOf(snippet);
            while (index !== -1) {
                this.snippets.splice(index, 1);
                index = this.snippets.indexOf(snippet);
            }
        }
    }
}

/**
 * The resulting type is structurally identical to the parameter T.
 * It only forces typescript to show the fully resolved type.
 * This helps users of the library.
 */
type AsResolved<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Creates a `Portal` and `Receiver` svelte component:
 *
 * `Portal` renders its child content at the location of the `Receiver`.
 *
 * @returns An object containing the Portal and Receiver components
 *
 * @example
 * 1. First, define the portal and receiver components using `createPortal`:
 *    ```javascript
 *    // src/lib/portals.js
 *    import { createPortal } from 'portl';
 *    export const Title = createPortal();
 *    ```
 *
 * 2. Then, use the `Receiver` component to specify where the title should be rendered:
 *    ```svelte
 *    <!-- src/routes/+layout.svelte -->
 *    <script>
 *      import { Title } from '$lib/portals.js';
 *    </script>
 *
 *    <!-- This is where the title will be rendered. -->
 *    <Title.Receiver />
 *
 *    <!-- Or specify a placeholder to render when no portal is present. -->
 *    <Title.Receiver>
 *      {#snippet placeholder()}
 *        ...
 *      {/snippet}
 *    </Title.Receiver>
 *    ```
 *
 * 3. Finally, use the `Portal` component to render the title:
 *    ```svelte
 *    <!-- src/routes/+page.svelte -->
 *    <script>
 *      import { Title } from '$lib/portals.js';
 *    </script>
 *
 *    <Title.Portal>
 *      <h1>My Title</h1>
 *    </Title.Portal>
 *    ```
 *
 * <https://github.com/FalkZ/portl#readme>
 */
export const createPortal = (): {
    /**
     * Receiver component that listens for snippets and renders them
     * at the location of the `Receiver`.
     */
    Receiver: Component<AsResolved<ReceiverProps>>;
    /**
     * Portal component that renders its child content at the location
     * of the `Receiver`.
     */
    Portal: Component<AsResolved<PortalProps>>;
} => {
    const state = new PortalState();

    return {
        Receiver: (internals, { placeholder }) => Receiver(internals, { state, placeholder }),
        Portal: (internals, { children }) => Portal(internals, { state, children }),
    };
};
