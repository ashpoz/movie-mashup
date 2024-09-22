<script setup>
import { ref, watch } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie'
import MovieInput from '../components/MovieInput.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import MovieMarqueeImage from '../components/MovieMarqueeImage.vue'
import HeadingComponent from '../components/HeadingComponent.vue'
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

watch(isGameWon, async () => {
  posterImages.value[0] = getPosterData(results.value.movies[0])
  posterImages.value[1] = getPosterData(results.value.movies[1])
  showWin.value = true
})

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
  box-shadow: 0px 0px 50px 1px gold;
  margin-top: 2rem;
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

button[type="submit"] {
  margin-top: 4rem;
  width: 100%;
  padding: 1rem;
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

.btn-group {
  justify-content: center;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}
</style>

<template>
    <section>
      <div id="gameForm">
        <h1>Movie Mashup Game</h1>
        <form v-show="!isGameWon" @submit.prevent="submit" ref="form">
          <fieldset>
            <HeadingComponent>
              <legend>Let's Play!</legend>
            </HeadingComponent>
            <label>Plot Synopsis:</label>
            <p>
              {{ movieSynopsis }}
            </p>
            <label for="movie1">1st Movie:</label>
            <MovieInput name="movie1" ref="input1" :valid="String(correctAnswers[0])" />
            <label for="movie2">2nd Movie:</label>
            <MovieInput name="movie2" ref="input2" :valid="String(correctAnswers[1])" />
            <input type="hidden" name="mashupId" :value="mashupId">

            <ErrorMessage v-show="formMessage" :message="formMessage" />

            <button type="submit" class="btn">Enter</button>
          </fieldset>
        </form>
      </div>
      <div id="gameWon" v-if="showWin">
        <div>
          <HeadingComponent>
            <p>{{ formMessage }}</p>
          </HeadingComponent>
          <div class="btn-group">
            <a href="/game" class="btn">Play Again</a>
          </div>
        </div>
        <MovieMarqueeImage :posterImages=posterImages />
      </div>
    </section>
</template>