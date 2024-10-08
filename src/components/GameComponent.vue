<script setup>
import { ref, watch } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie'
import MovieInput from '../components/MovieInput.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import MovieMarqueeImage from '../components/MovieMarqueeImage.vue'
import HeadingComponent from '../components/HeadingComponent.vue'
import HintsComponent from '../components/HintsComponent.vue'
import { getPosterData } from '../lib/getPosterData'
// TODO: move fetching all movie logic to server

// Mashup data
const movieMashup = await getRandomMovie();
const movieSynopsis = movieMashup.synopsis;
const mashupId = movieMashup.id;

// Vue vars
const results = ref()
const correctAnswers = ref([false, false])
const isGameWon = ref(false)
const showWin = ref(false)
const formMessage = ref(null)
const form = ref()
const posterImages = ref([])
const hintsActive = ref(false)
const mashupAnswer = ref(null)

watch(isGameWon, async () => {
  posterImages.value[0] = getPosterData(results.value.movies[0])
  posterImages.value[1] = getPosterData(results.value.movies[1])
  showWin.value = true
})

async function revealAnswer(e) {
  e.preventDefault()
  try {
    const response = await fetch(`/.netlify/functions/reveal-answer?mashup=${mashupId}`);
    const json = await response.json()

    results.value = json
    mashupAnswer.value = json.mashup.answer
    correctAnswers.value = json.answers
    isGameWon.value = json.correct
    formMessage.value = 'Better luck next time!'
  } catch (err) {
    console.error(err)
  }
}

async function submit(e) {
  const formData = new FormData(e.target)
  let formValues = [];

  for (const [inputName, value] of formData) {
    formValues.push({ inputName, value })
  }

  const movie1 = formValues.find((val) => val.inputName === 'movie1').value
  const movie2 = formValues.find((val) => val.inputName === 'movie2').value
  const movies = [encodeURIComponent(movie1), encodeURIComponent(movie2)]
  const mashup = formValues.find((val) => val.inputName === 'mashupId').value

  try {
    const response = await fetch(`/.netlify/functions/submit-answer?answer=${movies}&mashup=${mashup}`);
    const json = await response.json()

    results.value = json
    mashupAnswer.value = json.mashup.answer
    correctAnswers.value = json.answers
    isGameWon.value = json.correct
    formMessage.value = json.message
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
main {
  grid-template-columns: 1fr;
  text-align: center;

  @media (min-width: 768px) {
    gap: 2rem;
    text-align: left;
  }
}

h1 {
  height: 1px;
  width: 1px;
  position: absolute;
  overflow: hidden;
  top: -10px;
}

fieldset {
  border: none;
  padding: 2rem;
}

legend {
  text-align: center;
}

label {
  display: block;
  font-size: 0.75em;
  font-weight: 900;
  margin-top: 2rem;
  margin-bottom: 5px;
  text-transform: uppercase;

  &:first-of-type {
    margin-top: 0rem;
  }
}

h2 {
  margin-top: 4rem;
  text-align: center;
}

button[type="submit"] {
  width: 100%;
  padding: 1rem;
}

button[name="hints"] {
  align-items: center;
  background: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  display: flex;
  font-size: 1em;
  font-weight: bold;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  top: 0;

  svg {
    font-size: .75rem;
    fill: var(--yellow-dark);
    margin-left: .5rem;
  }
}

#gameForm {
  border: 1px solid var(--color-text);
  box-shadow: 0px 0px 50px 1px gold;
  display: grid;
  position: relative;
}

#gameWon {
  align-items: center;
  display: grid;
}

@media (min-width: 768px) {
  #gameWon {
    grid-template-columns: 1fr 1fr;
  }
}

#revealButton {
  display: block;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  padding: 0;
  text-decoration: underline;
  text-align: center;
}

@media (min-width: 768px) {
  #gameWon {
    grid-template-columns: 1fr 1fr;
  }
}

.btn-secondary svg {
  margin-left: .75rem;
  width: 1.75rem;
}

.btn-group {
  justify-content: center;
  margin-top: 4rem;
  gap: 0;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}
</style>

<template>
  <section>
    <div id="gameForm" v-show="!isGameWon">
      <HeadingComponent>
        <h2>Let's Play!</h2>
      </HeadingComponent>
      <button name="hints" @click="hintsActive = !hintsActive">
        Hints
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>

      </button>
      <form @submit.prevent="submit" ref="form">
        <fieldset>
          <label>Plot Synopsis:</label>
          <p>
            {{ movieSynopsis }}
          </p>
          <label for="movie1">1st Movie:</label>
          <MovieInput name="movie1" ref="input1" :valid="String(correctAnswers[0])" />
          <label for="movie2">2nd Movie:</label>
          <MovieInput name="movie2" ref="input2" :valid="String(correctAnswers[1])" />
          <input type="hidden" v-model="mashupId" name="mashupId">

          <ErrorMessage v-show="formMessage" :message="formMessage" />

          <div class="btn-group">
            <button ref="submit" type="submit" class="btn btn-primary">Enter</button>
            <button id="revealButton" href="" @click="revealAnswer">Reveal Answer?</button>
          </div>
        </fieldset>
      </form>
    </div>
    <div id="gameWon" v-if="showWin">
      <div>
        <HeadingComponent>
          <p>{{ formMessage }}</p>
        </HeadingComponent>
        <p>The answer is:</p>
        <p><strong>{{ mashupAnswer }}</strong></p>
        <div class="btn-group">
          <a href="/game" class="btn btn-primary">Play Again</a>
        </div>
      </div>
      <MovieMarqueeImage :posterImages=posterImages />
    </div>
  </section>
  <HintsComponent :active="hintsActive" :mashup="mashupId" />
</template>