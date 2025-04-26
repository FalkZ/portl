import { Component, Snippet } from "svelte";

declare module "portl" {
    type ChildrenSnippet = Snippet<[]>;

    type PortalComponent = Component<{ children: ChildrenSnippet }, {}, "">;

    type ReceiverComponent = Component<{ placeholder?: ChildrenSnippet }, {}, "">;

    /**
     * Creates a `Portal` and `Receiver` svelte component:
     *
     * `Portal` renders its child content at the location of the `Receiver`.
     *
     * @returns An object containing the Portal and Receiver components
     */
    export const createPortal: () => {
        Receiver: ReceiverComponent;
        Portal: PortalComponent;
    };
}
