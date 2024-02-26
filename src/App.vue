<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }

  main {
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
  }
</style>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Movie Mashup</RouterLink>
        <RouterLink to="/game/how-to-play">How to Play</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
