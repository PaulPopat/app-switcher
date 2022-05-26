<script>
  /** @type {(name, url) => Promise<void>}*/
  export let on_done;

  let name = "";
  let url = "";
  let icon_url = "";

  /** @param {Event} event */
  function OnDone(event) {
    event.preventDefault();
    if (!name || !url) return;
    on_done(name, url, icon_url).then(() => {
      name = "";
      url = "";
      icon_url = "";
    });
  }
</script>

<form on:submit={OnDone}>
  <div>
    <label>
      <span>Name:</span>
      <input type="text" bind:value={name} />
    </label>
  </div>
  <div>
    <label>
      <span>Url:</span>
      <input type="text" bind:value={url} />
    </label>
  </div>
  <div>
    <label>
      <span>Icon Url:</span>
      <input type="text" bind:value={icon_url} />
    </label>
  </div>

  <button type="submit">Create</button>
</form>

<style>
  form {
    padding: 20px;
    height: 100%;
    background: var(--colours-background);
  }

  label {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 5px;
    padding: 20px 0;
    color: var(--colours-text);
    align-items: center;
  }

  input {
    border: none;
    background: var(--colours-surface);
    padding: 7px 15px;
    border-radius: 5px;
    color: var(--colours-text);
  }

  input:hover {
    box-shadow: inset 0 0 0 1px var(--colours-surface-active);
  }

  input:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--colours-surface-open);
  }

  button {
    cursor: pointer;

    color: var(--colours-text);
    background: var(--colours-primary);
    border: none;
    border-radius: 5px;

    padding: 10px 20px;
  }

  button:hover {
    background: var(--colours-variant);
  }

  button:focus {
    background: var(--colours-secondary);
  }
</style>
