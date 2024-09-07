<script setup>
import MovieMarqueeImage from '../components/MovieMarqueeImage.vue';
</script>

<style scoped>
main {
  grid-template-columns: 1fr;
  text-align: center;

  @media (min-width: 768px) {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
}

h1 {
  font-weight: 900;
  text-transform: uppercase;
  font-size: 4rem;
  text-shadow: 1px 2px 0px gold;
  color: white;
}

.btn-group {
  justify-content: center;
  margin-top: 3rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}
</style>

<template>
  <main>
    <div>
      <h1>Movie Mashup</h1>
      <p>2 movies, one very bizarre plot.</p>
      <p><i>You</i> have to guess the combined movie title</p>
      <div class="btn-group">
        <router-link to="/game" class="btn">Play</router-link>
        <router-link to="/game/how-to-play" class="btn">How to Play</router-link>
      </div>
    </div>
    <MovieMarqueeImage />
  </main>
</template>
