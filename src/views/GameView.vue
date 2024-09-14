<script setup>
  import GameComponent from '../components/GameComponent.vue'
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

  p {
    font-size: 2.5rem;
    text-align: center;
  }
</style>

<template>
  <main>
    <Suspense>
      <GameComponent />
        <template #fallback>
          <p>Loading...</p>
        </template>
    </Suspense>
  </main>
</template>
