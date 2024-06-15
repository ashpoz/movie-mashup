
<script setup>
import { ref } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie';

const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;
const form = ref([]);

// TODO starting to hook up dummy data and form functionality 
function submit() {
  console.log(form.value.movie1)
  console.log(form.value.movie2)
}

function searchMovie() {
  // TODO: use TMDB API to search for a movie based on the query
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
input {
  margin-top: 2rem;
  padding: 1rem 2rem;
  width: 100%;
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
            {{movieSynopsis}}
          </p>
          <label for="movie1">1st Movie</label>
          <input type="text" v-model="form.movie1" required />
          <label for="movie2">1st Movie</label>
          <input type="text" v-model="form.movie2" required />          
          <button type="submit">Enter</button>
        </fieldset>
      </form>
    </section>
  </main>
</template>
