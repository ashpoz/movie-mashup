<script setup>
import { ref } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie'
import answers from '../data/movies.js'
import MovieInput from '../components/MovieInput.vue'

const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;
const form = ref([]);

async function submit() {
  let match = [false, false];
  answers.forEach(answer => {
    const movie1 = (answer.movies[0].title).toLowerCase();
    const movie2 = (answer.movies[1].title).toLowerCase();
    if (movie1 === (form.value.movie1).toLowerCase()) {
      match[0] = true;
    }
    if (movie2 === (form.value.movie2).toLowerCase()) {
      match[1] = true;
    }
  })
  console.log(validateAnswers(match))
}

function validateAnswers(arr) {
  if (arr[0] && !arr[1]) {
    return 'Your 1st guess is correct!'
  } else if (!arr[0] && arr[1]) {
    return 'Your 2nd guess is correct!'
  } else if (arr[0] && arr[1]) {
    return 'You got it!'
  } else {
    return 'Whoops, try again!'
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
  font-size: 0.75em;
  font-weight: bold;
  text-decoration: underline;
}

button {
  margin-top: 2rem;
}
</style>
<template>
  <main>
    <section>
      <h1>Movie Mashup Game</h1>
      <form @submit.prevent="submit">
        <fieldset>
          <legend>What is the movie?</legend>
          <pre>Answer: {{ randomMovie.answer }}</pre>
          <label>Plot Synopsis:</label>
          <p>
            {{ movieSynopsis }}
          </p>
          <label for="movie1">1st Movie</label>
          <MovieInput name="movie1" />
          <label for="movie2">2nd Movie</label>
          <MovieInput name="movie2" />
          <p>Answers:</p>
          <pre>{{ form.movie1 }}</pre>
          <pre>{{ form.movie2 }}</pre>
          <button type="submit">Enter</button>
        </fieldset>
      </form>
    </section>
  </main>
</template>
