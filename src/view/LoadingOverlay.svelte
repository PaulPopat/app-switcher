<script>
  import C from "./classes";

  import IconLoading from "./IconLoading.svelte";

  export let open = false;
</script>

<div class={C("overlay", ["open", open])}>
  <IconLoading size="64" colour="white" />
</div>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    opacity: 0;
    transition: opacity 500ms;
    pointer-events: none;

    display: flex;
    align-items: center;
    justify-content: center;

    background: white;
  }

  .overlay.open {
    opacity: 0.5;
  }
</style>
