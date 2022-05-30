<script>
  import AddForm from "./AddForm.svelte";
  import AppButton from "./AppButton.svelte";
  import C from "./classes";
  import IconBack from "./IconBack.svelte";
  import IconCreate from "./IconCreate.svelte";
  import IconRefresh from "./IconRefresh.svelte";
  import LoadingOverlay from "./LoadingOverlay.svelte";

  let apps_promise = Api.LoadApps();

  let url = "";
  let loading = false;
  let open = "";
  let creating = true;
  let spinning = false;

  Api.HandleNavStart((target) => {
    url = target;
    loading = true;
  });

  Api.HandleNav((target) => {
    url = target;
    loading = false;
  });

  Api.HandleNotifications(() => {
    apps_promise = Api.LoadApps();
  });

  function OpenApp(app) {
    return () => {
      creating = false;
      Api.OpenApp(app.id);
      document.querySelector("title").textContent = app.name;
      open = app.name;
    };
  }

  function DeleteApp(app) {
    return async () => {
      await Api.DeleteApp(app.id);
      apps_promise = Api.LoadApps();
    };
  }

  function Back() {
    Api.Back();
  }

  function Refresh() {
    Api.Refresh();
  }

  function StartCreate() {
    creating = true;
    Api.CloseApp();
  }

  async function DoneCreating(name, url, icon_url) {
    spinning = true;
    try {
      await Api.AddApp(name, url, icon_url);
      apps_promise = Api.LoadApps();
    } finally {
      spinning = false;
    }
  }
</script>

<main>
  <div class="application">
    <header>
      <div class="back-button" on:click={Back}>
        <IconBack />
      </div>
      <div class="back-button" on:click={Refresh}>
        <IconRefresh size="20" />
      </div>
      <div class={C("url", ["loading", loading])}>{url || " "}</div>
    </header>
    <div id="app-container">
      {#await apps_promise then apps}
        {#each apps as app}
          <AppButton
            selected={open === app.name}
            on_click={OpenApp(app)}
            on_delete={DeleteApp(app)}
            {app}
          >
            <img src={app.icon} alt={app.name} />
          </AppButton>
        {/each}

        <AppButton
          selected={false}
          on_click={StartCreate}
          app={{ name: "Create", notifications: 0 }}
        >
          <IconCreate />
        </AppButton>
      {/await}
    </div>
    <div class={C("browser-background", ["creating", creating])}>
      {#if spinning}
        <LoadingOverlay open={spinning} />
      {/if}
      {#if creating}
        <AddForm on_done={DoneCreating} />
      {/if}
    </div>
  </div>
</main>

<style>
  #app-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    background: var(--colours-surface);
  }

  #app-container::-webkit-scrollbar {
    display: none;
  }

  #app-container img {
    max-width: calc(100% - 6px);
    max-height: calc(100% - 6px);
    object-fit: contain;
  }

  .application {
    --header-height: 36px;
    display: grid;
    grid-template-columns: 4rem auto;
    grid-template-rows: var(--header-height) auto;
    height: 100vh;
    overflow: hidden;
  }

  header {
    -webkit-app-region: drag;
    grid-column: span 2;
    color: var(--colours-text);
    font-size: 14px;
    background: var(--colours-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);
    padding-left: 60px;
    max-width: 100%;
  }

  .url {
    --webkit-app-region: no-drag;
    width: 75vw;
    padding: 5px;
    background: var(--colours-surface-active);
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @keyframes loading {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }

  .url.loading {
    animation-name: loading;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .browser-background {
    position: relative;
    background: white;
    z-index: -1;
  }

  .browser-background.creating {
    z-index: 0;
  }

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;

    --webkit-app-region: no-drag;
    color: var(--colours-text);
    margin-right: 2rem;
    cursor: pointer;

    transition: opacity 100ms;
  }

  .back-button:hover {
    opacity: 0.4;
  }

  .back-button:active {
    opacity: 1;
  }
</style>
