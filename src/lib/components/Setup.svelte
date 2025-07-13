<script lang="ts">
    export let goTo: (route: string) => void;
    export let formData: { age?: number; timeOfDay?: string } = {};
    export let setFormData: (data: { age?: number; timeOfDay?: string }) => void;

    // Local state
    let age: string = formData?.age?.toString() ?? '';
    let error: string = '';
    let validAge: boolean = !!formData?.age;

    let selectedTime: string = formData?.timeOfDay ?? '';
    const options: string[] = ['morning', 'afternoon', 'evening', 'night'];

    function handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        const value = input.value.trim();

        const number = Number(value);
        if (!Number.isInteger(number) || number < 9 || number > 99) {
            error = 'Please enter a valid age';
            validAge = false;
        } else {
            error = '';
            age = value;
            validAge = true;
            setFormData({ age: number });
        }
    }

    function handleSelect(value: string) {
        selectedTime = value;
        setFormData({ timeOfDay: value });
    }

    function handleSubmit() {
        if (validAge && selectedTime) {
            goTo('test1pre');
        }
    }
</script>

<main class="flex flex-col items-center justify-center h-screen appear">
    <h1 class="text-4xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center p-9">
        First, enter your age and the time of day.
    </h1>

    <fieldset class="fieldset pb-5">
        <legend class="fieldset-legend">What is your age?</legend>
        <input
                type="text"
                class="input"
                placeholder="Type here"
                bind:value={age}
                on:input={handleInput}
        />
        {#if error}
            <p style="color: red;">{error}</p>
        {/if}
    </fieldset>

    <div class="dropdown pb-10">
        <div tabindex="0" role="button" class="btn m-1">
            {selectedTime
                ? selectedTime.charAt(0).toUpperCase() + selectedTime.slice(1)
                : 'Select Time(dropdown)'}
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {#each options as option}
                <li><a on:click={() => {document.activeElement?.blur(); handleSelect(option)}}>{option.charAt(0).toUpperCase() + option.slice(1)}</a></li>
            {/each}
        </ul>
    </div>

    <button
            class="btn btn-soft xl:btn-xl appear"
            on:click={handleSubmit}
            disabled={!validAge || !selectedTime}
    >
        Submit
    </button>
</main>
