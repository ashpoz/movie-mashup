<script setup>
import { computed } from 'vue'

const props = defineProps(['posterImages'])

const cssProps = computed(() => {
  return {
    '--poster-image-1': `url(${props.posterImages[0].url})`,
    '--poster-image-2': `url(${props.posterImages[1].url})`,
  }
})


</script>

<style scoped>
@keyframes flash {
  from {
    border-color: var(--black-mute);
  }

  to {
    border-color: #FFF5C3;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

figure {
  animation-delay: 250ms;
  animation-duration: 1000ms;
  animation-name: flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  aspect-ratio: 2 / 3;
  background-color: black;
  outline: 10px solid black;
  position: relative;
  border-width: 25px;
  border-color: #FFF5C3;
  border-style: dotted;
  padding: .5rem 2rem;
  text-decoration: none;
  text-transform: uppercase;
  outline: 13px solid black;
  box-shadow: 0px 0px 50px 1px gold;
  width: 100%;
  max-width: 350px;

  img {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  div:nth-child(1) {
    animation-delay: 0;
    animation-duration: 5s;
    animation-name: fadeIn;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;

    background: var(--poster-image-1), var(--poster-image-2);
    background-blend-mode: overlay;
    background-repeat: no-repeat;
    background-size: cover;
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  div:nth-child(2) {
    animation-delay: 5s;
    animation-duration: 5s;
    animation-name: fadeIn;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;

    background: var(--poster-image-2), var(--poster-image-1);
    background-blend-mode: overlay;
    background-repeat: no-repeat;
    background-size: cover;
    left: 0;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @media (min-width: 768px) {
    max-width: 100%;
  }
}
</style>

<template>
  <figure :style="cssProps">
    <div></div>
    <div></div>
  </figure>
</template>
