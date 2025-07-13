<script>
    export let goTo;
</script>

<main class="flex flex-col items-center justify-center h-screen appear">
    <h1
            class="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center p-9"
    >
        Click/tap the right answer to the easy math problems as fast as possible! The test <span class="text-blue-400">repeats</span>!
    </h1>
    <button class="btn btn-soft xl:btn-xl appear" on:click={() => goTo('test1')}
    >I'm Ready</button
    >
</main>