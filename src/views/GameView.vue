<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie'
import answers from '../data/movies.js'
import MovieInput from '../components/MovieInput.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

const router = useRouter()
const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;
const correctAnswers = ref([false, false])
const isGameWon = ref(false)
const formMessage = ref(null)
const form = ref()

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
    formValues.push({inputName, value})
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

  console.log(form.value)

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
}

section {
  margin: auto;
  max-width: 800px;
  width: 100%;
}

h1 {
  height: 1px;
  width: 1px;
  position: absolute;
  overflow: hidden;
  top: -10px;
}

fieldset {
  margin-top: 2rem;
  padding: 2rem;
}

legend {
  font-weight: bold;
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

button {
  margin-top: 2rem;
}

figure {
  aspect-ratio: 2 / 3;
  background-color: black;
  border: 30px solid #343434;
  outline: 10px solid black;
  position: relative;

  img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  span {
    content: '';
    background: radial-gradient(ellipse at center, #FFF5C3 0%, #FFF5C3 30%, transparent 30%);
    background-repeat: repeat;
    position: absolute;
    background-size: 50px;
  }

  span:first-of-type {
    width: calc(100% + 60px);
    height: 50px;
    top: -40px;
    left: -30px;
  }
  span:nth-of-type(2) {
    width: calc(100% + 60px);
    height: 50px;
    bottom: -40px;
    left: -30px;
  }
  span:nth-of-type(3) {
    width: calc((100% * 1.5) + 30px);
    height: 50px;
    top: -30px;
    left: -15px;
    transform: rotate(90deg);
    transform-origin: left;
  }
  span:nth-of-type(4) {
    width: calc((100% * 1.5) + 30px);
    height: 50px;
    right: -15px;
    bottom: -15px;
    transform: rotate(90deg);
    transform-origin: right;
  }
}

#gameWon {
  display: grid;
}

@media (min-width: 768px) {
  #gameWon {
    grid-template-columns: 1fr 1fr;
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
            <legend>What is the movie?</legend>
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
          <p>{{ formMessage }}</p>
          <div class="btn-group">
            <button @click="refreshPage" class="btn">Play Again</button>
          </div>
        </div>
        <div>
          <figure>
            <img src="" alt="Movie Poster 1" />
            <img src="" alt="Movie Poster 2" />
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </figure>
        </div>
      </div>
    </section>
  </main>
</template>
