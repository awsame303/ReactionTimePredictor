<script lang="ts">
    import { onMount } from 'svelte';

    export let goTo: (route: string) => void;
    export let formData: { cognitive?: number } = {};
    export let setFormData: (data: { cognitive: number }) => void;

    // Question definitions
    type Question = {
        question: string;
        answer: number;
        distractors: number[];
    };

    const questions: Question[] = [
        { question: 'What is 2 × 5?', answer: 10, distractors: [8] },
        { question: 'What is 2 + 3?', answer: 5, distractors: [3] },
        { question: 'What is 3 × 4?', answer: 12, distractors: [9] }
    ];

    let currentQuestionIndex = 0;
    let currentQuestion = questions[currentQuestionIndex];
    let choices: number[] = [];
    let startTime = 0;

    // Initialize formData if needed

    function randomizeChoices(question: Question) {
        const allChoices = [...question.distractors];
        const correctIndex = Math.floor(Math.random() * 2);
        allChoices.splice(correctIndex, 0, question.answer);
        return allChoices;
    }

    function setupQuestion() {
        currentQuestion = questions[currentQuestionIndex];
        choices = randomizeChoices(currentQuestion);
        startTime = performance.now();
    }

    onMount(() => {
        setupQuestion();
    });

    let rawResults: number[] = [-1, -1, -1]; // internal tracking

    function handleAnswer(choice: number) {
        const endTime = performance.now();
        const reactionTime = Math.round(endTime - startTime);

        rawResults[currentQuestionIndex] = (choice === currentQuestion.answer) ? reactionTime : -1;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            setupQuestion();
        } else {
            // Filter out invalid answers
            const validScores = rawResults.filter(t => t !== -1);
            const average = validScores.length > 0
                ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
                : -1;

            setFormData({ cognitive: average });
            goTo('test2pre');
        }
    }

</script>

<main class="flex flex-col items-center justify-center h-screen w-screen bg-base-100 p-4 appear">
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-8">
        {currentQuestion.question}
    </h1>

    <div class="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full max-h-[60vh]">
        {#each choices as choice}
            <button
                    class="btn btn-primary text-4xl w-full h-full"
                    on:click={() => handleAnswer(choice)}
            >
                {choice}
            </button>
        {/each}
    </div>
    <p class="mt-6 text-lg text-center">Trial {currentQuestionIndex + 1} of 3</p>
</main>
