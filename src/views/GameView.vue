<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie'
import answers from '../data/movies.js'
import MovieInput from '../components/MovieInput.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import MovieMarqueeImage from '../components/MovieMarqueeImage.vue'
import HeadingComponent from '../components/HeadingComponent.vue'

const router = useRouter()
const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;
const correctAnswers = ref([false, false])
const isGameWon = ref(false)
const formMessage = ref(null)
const form = ref()
const posterImages = ref([randomMovie.movies[0].image, randomMovie.movies[1].image])

const refreshPage = () => {
  router.go(0)
}

// add some err styling
// if one is correct, highlight green and the other red
// if both are incorect, highlight red
// if both correct, hide form and show game is won view

async function submit(e) {
  const formData = new FormData(e.target)
  let formValues = [];

  for (const [inputName, value] of formData) {
    formValues.push({ inputName, value })
  }
  answers.forEach(answer => {
    const movie1 = (answer.movies[0].title).toLowerCase();
    const movie2 = (answer.movies[1].title).toLowerCase();

    if (movie1 === (formValues[0].value).toLowerCase()) {
      correctAnswers.value[0] = true
    }

    if (movie2 === (formValues[1].value).toLowerCase()) {
      correctAnswers.value[1] = true
    }
  })

  // if all arr vals are true, game is won
  isGameWon.value = correctAnswers.value.every(value => value === true)

  // update message
  validateAnswers(correctAnswers.value)
}

function validateAnswers(arr) {
  if (arr[0] && !arr[1]) {
    formMessage.value = 'Your 1st guess is correct!'
  } else if (!arr[0] && arr[1]) {
    formMessage.value = 'Your 2nd guess is correct!'
  } else if (arr[0] && arr[1]) {
    formMessage.value = 'You got it!'
  } else {
    formMessage.value = 'Whoops, try again!'
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
  font-weight: bold;
  margin-top: 2rem;
  text-decoration: underline;

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
  <main>
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
            <MovieInput name="movie1" ref="input1" :valid="correctAnswers[0]" />
            <label for="movie2">2nd Movie:</label>
            <MovieInput name="movie2" ref="input2" :valid="correctAnswers[1]" />

            <ErrorMessage v-show="formMessage" :message="formMessage" />

            <button type="submit" class="btn">Enter</button>
          </fieldset>
        </form>
      </div>
      <div id="gameWon" v-show="isGameWon">
        <div>
          <HeadingComponent>
            <p>{{ formMessage }}</p>
          </HeadingComponent>
          <div class="btn-group">
            <button @click="refreshPage" class="btn">Play Again</button>
          </div>
        </div>
        <MovieMarqueeImage :posterImages=posterImages />
      </div>
    </section>
  </main>
</template>
