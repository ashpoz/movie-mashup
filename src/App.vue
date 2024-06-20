<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<style>
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
    <NavBar />
  </header>
  <RouterView />
</template>
