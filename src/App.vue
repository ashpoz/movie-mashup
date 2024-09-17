<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<style>
  main {
    align-items: center;
    display: grid;
    column-gap: 1rem;
    row-gap: 5rem;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }
</style>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>
