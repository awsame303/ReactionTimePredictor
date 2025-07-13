<script lang="ts">
    import { onMount } from 'svelte';

    const COGNITIVE_KEY = 'reactionCognitive';
    const VISUAL_KEY = 'reactionVisual';
    const COMPLETION_KEY = 'reactionTestCompleted';

    export let formData: { cognitive?: number | number[]; visual?: number } = {};

    let cognitiveDisplay: number = -1;
    let visualDisplay: number = -1;

    // Helper: average cognitive time if array
    function averageCognitive(input?: number | number[]) {
        if (Array.isArray(input)) {
            const sum = input.reduce((a, b) => a + b, 0);
            return Math.round(sum / input.length);
        }
        return input ?? -1;
    }

    onMount( async () => {
        // Read from localStorage first
        const storedCognitive = localStorage.getItem(COGNITIVE_KEY);
        const storedVisual = localStorage.getItem(VISUAL_KEY);

        // Parse stored values or fallback to -1
        cognitiveDisplay = storedCognitive ? parseInt(storedCognitive) : -1;
        visualDisplay = storedVisual ? parseInt(storedVisual) : -1;

        // If not stored yet, and formData has valid values, save them
        if (!storedCognitive) {
            const avgCognitive = averageCognitive(formData.cognitive);
            if (avgCognitive !== -1) {
                localStorage.setItem(COGNITIVE_KEY, avgCognitive.toString());
                cognitiveDisplay = avgCognitive;
            }
        }

        if (!storedVisual) {
            const visualVal = formData.visual ?? -1;
            if (visualVal !== -1) {
                localStorage.setItem(VISUAL_KEY, visualVal.toString());
                visualDisplay = visualVal;
            }
        }

        // Also set completion flag if not present
        if (!localStorage.getItem(COMPLETION_KEY)) {
            await sendResultsToSheetdb(formData);
            localStorage.setItem(COMPLETION_KEY, 'true');
        }
    });

    async function sendResultsToSheetdb(formData: {
        age?: number;
        timeOfDay?: string;
        visual?: number;
        cognitive?: number | number[];
    }) {
        // Calculate average cognitive if array
        let cognitiveVal = -1;
        if (Array.isArray(formData.cognitive)) {
            const sum = formData.cognitive.reduce((a, b) => a + b, 0);
            cognitiveVal = Math.round(sum / formData.cognitive.length);
        } else if (typeof formData.cognitive === 'number') {
            cognitiveVal = formData.cognitive;
        }

        // Prepare payload
        const payload = {
            data: {
                age: formData.age ?? '',
                timeOfDay: formData.timeOfDay ?? '',
                visual: formData.visual ?? -1,
                cognitive: cognitiveVal,
                timestamp: new Date().toISOString(),
            },
        };

        try {
            const res = await fetch('https://sheetdb.io/api/v1/62jhpdw6ry8p9', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                console.error('Failed to send data to SheetDB:', await res.text());
            } else {
                console.log('Data successfully sent to SheetDB');
            }
        } catch (error) {
            console.error('Error sending data to SheetDB:', error);
        }
    }

</script>

<main class="flex flex-col items-center justify-center h-screen appear">
    <h1 class="text-4xl font-bold text-center p-9">
        Thanks for taking the test! Here's your scores:
        <br /><br /><br />
        {#if cognitiveDisplay === -1}
        🧠 Cognitive Reaction Time: <span class="text-red-500">No questions correct!</span>
        {:else}
            🧠 Cognitive Reaction Time: <span class="text-green-500">{cognitiveDisplay} ms</span>
        {/if}
        <br />
        👁️ Visual Reaction Time: <span class="text-green-500">{visualDisplay} ms</span>
    </h1>
</main>
