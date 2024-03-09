
<script setup>
import {ref} from 'vue';

import { getRandomMovie } from '../lib/getRandomMovie';

const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;

let answer = ref(null)

// TODO starting to hook up dummy data and form functionality 

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
      <form>
        <fieldset>
          <legend>What is the movie?</legend>
          <pre>Answer: {{ randomMovie.answer }}</pre>
          <label>Plot Synopsis:</label>
          <p>
            {{movieSynopsis}}
          </p>
          <input ref="answer" type="text" />
          <button type="submit">Enter</button>
        </fieldset>
      </form>
    </section>
  </main>
</template>
