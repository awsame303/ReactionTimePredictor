<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<div class="app">
  <main class="w-screen min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
  {@render children()}
  </main>
</div>

<style>
</style>
