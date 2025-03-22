# portl

> A lightweight portal library for Svelte 5.

## Installation

```bash
npm install portl
```

## Usage

Portl lets you render content in different locations than where it's defined. Using `Portal` to define the content and `Receiver` to define where it is rendered.

### Basic Example

```svelte
<script>
    import { createPortal } from "portl";

    const Title = createPortal();
</script>

<!-- Define the rendering location (e.g. in a +layout.svelte) -->
<Title.Receiver />

<!-- Define the content elsewhere (e.g. in a +page.svelte) -->
<Title.Portal>
    <h1>This content will be rendered at the Receiver location</h1>
</Title.Portal>
```

### Multiple Portals

You can create as many portals as you like:

```js
import { createPortal } from "portl";

export const Header = createPortal();
export const Footer = createPortal();
```

`Header` and `Footer` can be used anywhere in your application.

### Placeholder

You can provide a placeholder when no portal content is present:

```svelte
<script>
    import { createPortal } from "portl";

    const Modal = createPortal();
</script>

<Title.Receiver>
    {#snippet placeholder()}
        <h1>Default Title</h1>
    {/snippet}
</Title.Receiver>
```

### Conditional Rendering

Portals work seamlessly with Svelte's conditional rendering:

```svelte
<script>
    import { createPortal } from "portl";

    const Modal = createPortal();
    let isOpen = $state(false);
</script>

<Modal.Receiver />

<Modal.Portal>
    {#if isOpen}
        <div class="modal">
            <h2>Modal Content</h2>
            <button on:click={() => (isOpen = false)}>Close</button>
        </div>
    {/if}
</Modal.Portal>
```

### Rendering Order

You can render as many portals as you want in a receiver. If you render multiple portals they will be rendered in the order the portals where mounted:

```svelte
<Title.Portal>This is shown first</Title.Portal>

<Title.Portal>This is shown second</Title.Portal>
```

Therefore it is better to define conditional rendering inside of the portal when ever possible:

```svelte
<Title.Portal>
    {#if condition}✅ This will always rendered first{/if}
</Title.Portal>
<Title.Portal>✅ This will always rendered second</Title.Portal>
```

Rather than:

```svelte
{#if condition}<Title.Portal>❌ This will NOT always be rendered first</Title.Portal>{/if}
<Title.Portal>❌ This will NOT always rendered second</Title.Portal>
```
