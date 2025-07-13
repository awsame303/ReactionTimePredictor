<script>
    export let goTo;
</script>

<main class="flex flex-col items-center justify-center h-screen appear">
    <h1
            class="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center p-9"
    >
        Click/tap on the circle when it turns from <span class="text-red-600">red</span> to <span class="text-green-400">green</span>.
        <br />
        <span class="font-bold">Don't click when <span class="text-red-600">red</span>!! The test <span class="text-purple-400">repeats</span>!</span>
    </h1>

    <button class="btn btn-soft xl:btn-xl appear" on:click={() => goTo('test2')}
    >I'm Ready</button
    >
</main>