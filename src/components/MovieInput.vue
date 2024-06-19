<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  name: { type: String },
})

const movieValue = ref(null)
const movieResults = ref([]);
const isDropdownActive = ref(false);

const debouncedSearch = useDebounceFn((query) => {
  searchMovie(query)
}, 1000);

async function searchMovie(query) {
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
    const movies = results.map(item => (
      { id: item.id, title: item.title, release_date: item.release_date }
    ))
    movieResults.value[props.name] = movies;
    console.log(movieResults.value)
  } catch (err) {
    console.error(err);
  }
}
</script>
<style scoped>
input {
  margin-top: 2rem;
  padding: 1rem 2rem;
  width: 100%;
}
ul {
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  list-style: none;
  padding: 0;
}

li {
  color: #000;
  cursor: pointer;
  font-size: 0.75em;
  padding: .25rem 2rem;
  &:hover {
    background-color: lightgray;
  }
}
</style>
<template>
  <input @keyup="debouncedSearch(movieValue, $event)" @focus="isDropdownActive = true" @blur="isDropdownActive = false" type="text"
    :name="props.name" v-model="movieValue" required />
  <ul v-show="isDropdownActive">
    <li @mousedown="movieValue = $event.target.textContent" v-for="movie in movieResults[props.name]" :key="movie.id">
      {{ movie.title }}
    </li>
  </ul>
</template>