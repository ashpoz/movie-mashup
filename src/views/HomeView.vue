<script setup></script>

<style scoped>
  main {
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
      gap: 2rem;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<template>
  <main>
    <div>
      <h1>Movie Mashup</h1>
      <p>2 movies, one very bizarre plot.</p>
      <p><i>You</i> have to guess the combined movie title</p>
      <router-link to="/game" class="btn">Play</router-link>
      <router-link to="/game/how-to-play" class="btn">How to Play</router-link>
    </div>
    <figure>
      <img src="https://placehold.co/400x600" alt="">
    </figure>
  </main>
</template>
