<script>
    export let goTo;
</script>

<main class="flex flex-col items-center justify-center h-screen appear">
  <h1
    class="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center pb-9 px-9"
  >
    Take the Reaction Time Test. Click the button to get started.
  </h1>
    <button class="btn btn-soft xl:btn-xl appear" on:click={() => goTo('setup')}
      >Take the Test</button
    >
</main>
