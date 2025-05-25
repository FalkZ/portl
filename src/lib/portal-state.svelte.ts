import type { Component, Snippet } from "svelte";
import Receiver from "./receiver.svelte";
import Portal from "./portal.svelte";

export type ChildrenSnippet = Snippet<[]>;

export class PortalState {
    snippets: ChildrenSnippet[] = $state([]);

    addSnippet(snippet?: ChildrenSnippet) {
        if (snippet) {
            this.snippets.push(snippet);
        }
    }

    removeSnippet(snippet?: ChildrenSnippet) {
        if (snippet) {
            let index = this.snippets.indexOf(snippet);
            while (index !== -1) {
                this.snippets.splice(index, 1);
                index = this.snippets.indexOf(snippet);
            }
        }
    }
}

type PortalComponent = Component<{ children: ChildrenSnippet }, {}, "">;

type ReceiverComponent = Component<{ placeholder?: ChildrenSnippet }, {}, "">;

/**
 * Creates a `Portal` and `Receiver` svelte component:
 *
 * `Portal` renders its child content at the location of the `Receiver`.
 *
 * @returns An object containing the Portal and Receiver components
 */
export const createPortal = (): {
    Receiver: ReceiverComponent;
    Portal: PortalComponent;
} => {
    const state = new PortalState();

    const receiver: ReceiverComponent = (internals, { placeholder }) =>
        Receiver(internals, { state, placeholder });

    const portal: PortalComponent = (internals, { children }) =>
        Portal(internals, { state, children });

    return { Receiver: receiver, Portal: portal };
};
