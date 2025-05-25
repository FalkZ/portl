import type { Component, ComponentProps, Snippet } from "svelte";
import Receiver from "./receiver.svelte";
import Portal from "./portal.svelte";

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

type Resolve<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Creates a `Portal` and `Receiver` svelte component:
 *
 * `Portal` renders its child content at the location of the `Receiver`.
 *
 * @returns An object containing the Portal and Receiver components
 */
export const createPortal = (): {
    Receiver: Component<Resolve<Omit<ComponentProps<typeof Receiver>, "state">>>;
    Portal: Component<Resolve<Omit<ComponentProps<typeof Portal>, "state">>>;
} => {
    const state = new PortalState();

    return {
        Receiver: (internals, { placeholder }) => Receiver(internals, { state, placeholder }),
        Portal: (internals, { children }) => Portal(internals, { state, children }),
    };
};
