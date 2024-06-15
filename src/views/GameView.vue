<script setup>
import { ref, reactive } from 'vue'
import { getRandomMovie } from '../lib/getRandomMovie';
import { useDebounceFn } from '@vueuse/core'

// TODO: Show results in clickable dropdown list

const randomMovie = getRandomMovie();
const movieSynopsis = randomMovie?.synopsis;
const form = ref([]);
const movieResults = ref([]);

const debouncedSearch = useDebounceFn((query, event) => {
  searchMovie(query, event)
}, 1000);

function submit() {
  console.log(form.value.movie1)
  console.log(form.value.movie2)
}

async function searchMovie(query, event) {
  const inputName = event?.target.name

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTg2YWVlYmRhOWM4NzVjZTQ5ZTA2YTJmZDhjOTlmNSIsInN1YiI6IjYyNTVmZDgwMmRkYTg5MDA2NmU4NzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BGjP8czC9gE31X7jpxE-pQBgCKEQ7p9BxEPw7Pc17Dc'
    }
  };

  const searchMovie = fetch(`https://api.themoviedb.org/3/search/movie?query=${decodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, options);

  try {
    const data = (await searchMovie).json();
    const response = await data;
    const results = await response.results;

    // console.log(results);

    const movies = results.map(item => (
      { id: item.id, title: item.title, release_date: item.release_date }
    ))
    movieResults.value[inputName] = movies;
    console.log(movieResults.value);
  } catch (err) {
    console.error(err);
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
            {{ movieSynopsis }}
          </p>
          <label for="movie1">1st Movie</label>
          <input @keyup="debouncedSearch(form.movie1, $event)" type="text" name="movie1" v-model="form.movie1" required />
          <p>Results:</p>
          <ul>
            <li v-for="movie in movieResults.movie1" :key="movie.id">
              {{ movie.title }}
            </li>
          </ul>
          <label for="movie2">2nd Movie</label>
          <input @keyup="debouncedSearch(form.movie2, $event)" type="text" name="movie2" v-model="form.movie2" required />
          <p>Results:</p>
          <ul>
            <li v-for="movie in movieResults.movie2" :key="movie.id">
              {{ movie.title }}
            </li>
          </ul>
          <p>Answers:</p>
          <pre>{{ form.movie1 }}</pre>
          <pre>{{ form.movie2 }}</pre>
          <button type="submit">Enter</button>
        </fieldset>
      </form>
    </section>
  </main>
</template>
