<script setup>
const props = defineProps(['text'])
</script>

<style scoped>
  :slotted(*) {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 4rem;
    text-shadow: 1px 2px 0px gold;
    color: white;
  }
</style>

<template>
  <slot>{{ props.text }}</slot>
</template>