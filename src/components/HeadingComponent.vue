<script setup>
const props = defineProps(['text'])
</script>

<style scoped>
  :slotted(*) {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 3rem;
    text-shadow: 1px 2px 0px gold;
    color: var(--color-text);

    @media (min-width: 768px) {
      font-size: 4rem;
    }
  }
</style>

<template>
  <slot>{{ props.text }}</slot>
</template>