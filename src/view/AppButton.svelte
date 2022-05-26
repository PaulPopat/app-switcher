<script>
  import C from "./classes";
  import IconMinus from "./IconMinus.svelte";

  export let on_click = () => {};
  /** @type {() => void} */
  export let on_delete;
  export let selected = false;
  export let name = "";
</script>

<div class={C("app-button-container", ["open", selected])}>
  {#if on_delete}
    <button class="delete-button" on:click={on_delete}>
      <IconMinus size="10" colour="white" />
    </button>
  {/if}
  <span>{name}</span>
  <button class="app-button" on:click={on_click}>
    <slot />
  </button>
</div>

<style>
  .app-button-container {
    position: relative;
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    color: var(--colours-text);
    text-align: center;
  }

  .app-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--button-size);
    height: var(--button-size);
    padding: var(--button-padding);
    border-radius: var(--button-size);
    background: var(--colours-surface);
    cursor: pointer;
    margin-top: 5px;
  }

  .app-button:hover {
    background-color: var(--colours-surface-active);
  }

  .app-button-container.open {
    background-color: var(--colours-surface-open);
  }

  .app-button-container.open .app-button {
    border-color: var(--colours-text);
  }

  .delete-button {
    display: none;
    background: var(--colours-primary);
    position: absolute;
    bottom: 43px;
    right: 6px;
    border-radius: 10px;
    width: 15px;
    height: 15px;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
  }

  .delete-button:hover {
    background: var(--colours-variant);
  }

  .delete-button:focus {
    background: var(--colours-secondary);
  }

  .app-button-container:hover .delete-button {
    display: flex;
  }
</style>
