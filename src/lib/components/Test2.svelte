<script lang="ts">
    import { onMount } from 'svelte';

    export let goTo: (route: string) => void;
    export let formData: { visual?: number } = {};
    export let setFormData: (data: { visual: number }) => void;

    let trialIndex = 0;
    let trials: number[] = [-1, -1, -1];

    let status: 'waiting' | 'ready' | 'tooSoon' = 'waiting';
    let instruction = 'Click when the cylinder turns green';
    let startTime = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function startTrial() {
        status = 'waiting';
        instruction = 'Click when the cylinder turns green';

        const delay = Math.random() * 4000 + 3000; // 3–7 seconds
        timeoutId = setTimeout(() => {
            status = 'ready';
            instruction = 'Click!';
            startTime = performance.now();
        }, delay);
    }

    onMount(() => {
        startTrial();
    });

    function handleClick() {
        if (status === 'waiting') {
            // Too early → retry this trial
            clearTimeout(timeoutId);
            status = 'tooSoon';
            instruction = 'Too soon! Try again...';

            setTimeout(() => {
                startTrial(); // retry same trial
            }, 1000);

            return;
        }

        if (status === 'ready') {
            const reactionTime = Math.round(performance.now() - startTime);
            trials[trialIndex] = reactionTime;
            trialIndex++;

            if (trialIndex < 3) {
                startTrial();
            } else {
                const valid = trials.filter(t => t !== -1);
                const average = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : -1;

                setFormData({ visual: average });
                goTo('done');
            }
        }
    }
</script>

<main class="flex flex-col items-center justify-center h-screen w-screen bg-base-100 p-4 appear">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-12">{instruction}</h1>

    <div
            class={`w-52 h-52 md:w-72 md:h-72 rounded-full cursor-pointer transition-colors duration-300
      ${status === 'ready' ? 'bg-green-500' : 'bg-red-600'}`}
            on:click={handleClick}
    ></div>

    {#if status !== 'tooSoon'}
        <p class="mt-6 text-lg text-center">Trial {trialIndex + 1} of 3</p>
    {/if}
</main>
