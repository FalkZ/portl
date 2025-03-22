<script lang="ts">
    import { createPortal } from "$lib/index.js";

    const Title = createPortal();

    let s = $state(0);
</script>

<button onclick={() => s++}>Click me {s}</button>

<Title.Receiver />

{#if s % 2 === 0}
    <Title.Portal>
        <h1>Hello 2</h1>
    </Title.Portal>
{/if}

{#if s % 4 === 0}
    <Title.Portal>
        <h1>Hello</h1>
    </Title.Portal>
{/if}

<Title.Receiver>
    {#snippet placeholder()}
        <h1>Hello 3</h1>
    {/snippet}
</Title.Receiver>
