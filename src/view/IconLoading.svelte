<script>
  export let size = 24;
  export let colour = "white";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
>
  <path fill="none" d="M0 0h24v24H0z" />
  <path
    d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"
    fill={colour}
  />
</svg>

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: spinner 0.6s linear infinite;
  }
</style>
