<script setup>
import MovieMarqueeImage from '../components/MovieMarqueeImage.vue';
import HeadingComponent from '../components/HeadingComponent.vue';

const posterImages = [
  {
    url: 'https://lionsgate.brightspotcdn.com/4c/7a/12a223204a37817b83b701111d4f/apocalypse-now-movie-poster-01.jpg',
    alt: 'Apocalypse Now movie poster. Shows a man in camoflauge with his face halfway submerged in water.'
  },
  {
    url: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/249/2024/08/12152309/q31Ks8oAmM4Nq2CcGjyYYpdBAmh-scaled.jpg',
    alt: 'Now and Then movie poster. Shows a group of young adults and young women in front of a bright blue sky background.'
  }
]
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
      <HeadingComponent>
        <h1>Movie Mashup</h1>
      </HeadingComponent>
      <p>2 movies, 1 very bizarre plot.</p>
      <p><i>You</i> have to guess the combined movie title</p>
      <div class="btn-group">
        <router-link to="/game" class="btn">Play</router-link>
        <router-link to="/game/how-to-play" class="btn">How to Play</router-link>
      </div>
    </div>
    <MovieMarqueeImage 
      :posterImages=posterImages
    />
  </main>
</template>
