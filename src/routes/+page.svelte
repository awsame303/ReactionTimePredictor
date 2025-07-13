<script lang="ts">
  import Intro from '$lib/components/Intro.svelte';
  import Setup from '$lib/components/Setup.svelte';
  import Test1Pre from "$lib/components/Test1Pre.svelte";
  import Test1 from "$lib/components/Test1.svelte";
  import Test2Pre from "$lib/components/Test2Pre.svelte";
  import Test2 from "$lib/components/Test2.svelte";
  import Done from "$lib/components/Done.svelte";

  let screen: string = 'intro';
  let formData = {
    age: 0,
    timeOfDay: '',
    visual: -1,
    cognitive: -1,
  };

  function goTo(newScreen: string) {
    console.log(`Navigating to: ${newScreen}`);
    screen = newScreen;
  }

  function updateFormData(newData) {
    formData = { ...formData, ...newData };
    console.log("Updated form data:", formData);
  }

  import { onMount } from 'svelte';

  const COMPLETION_KEY = 'reactionTestCompleted';

  onMount(() => {
    const completed = localStorage.getItem(COMPLETION_KEY);
    if (completed === 'true') {
      goTo('done');
    }
  });
</script>

<svelte:head>
  <title>RTTest</title>
  <meta name="description" content="Reaction Time Test" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

</svelte:head>

<main class="h-full w-full flex flex-col justify-center items-center">
  {#if screen === 'intro'}
    <Intro goTo={goTo} />
  {:else if screen === 'setup'}
    <Setup goTo={goTo} setFormData={updateFormData} formData={formData}  />
  {:else if screen === 'test1pre'}
    <Test1Pre goTo={goTo} />
  {:else if screen === 'test1'}
    <Test1 goTo={goTo} setFormData={updateFormData} formData={formData} />
  {:else if screen === 'test2pre'}
    <Test2Pre goTo={goTo} />
  {:else if screen === 'test2'}
    <Test2 goTo={goTo} setFormData={updateFormData} formData={formData} ></Test2>
  {:else if screen === 'done'}
    <Done formData={formData} />
  {:else}
    <h1>Unknown screen: {screen}</h1>
  {/if}
</main>

<style>
</style>
