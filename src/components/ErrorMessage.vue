<script setup>
const props = defineProps({
  message: { type: String },
})
</script>

<style scoped>
  div {
    background-color: aliceblue;
    border: darkred 2px solid;
    color: darkred;
    padding: 1rem;
    margin: 1rem 0;
  }
</style>

<template>
  <div>
    <p>❌ {{ props.message }}</p>
  </div>
</template>