<script setup>

const props = defineProps(['posterImages'])

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
  /* animation-delay: 250ms; */
  animation-duration: 1000ms;
  animation-name: flash;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  aspect-ratio: 2 / 3;
  background-color: black;
  display: block;
  outline: 10px solid black;
  position: relative;
  border-width: 25px;
  border-color: #FFF5C3;
  border-style: dotted;
  padding: .5rem 2rem;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  outline: 13px solid black;
  box-shadow: 0px 0px 50px 1px gold;
  width: 100%;
  max-width: 350px;

  & img {
    height: 100%;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    width: auto;
  }

  & div {
    /* animation */
    animation-duration: 5s;
    animation-name: fadeIn;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;

    /* layout */
    left: 0;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }

  & div:nth-child(1) img {
    animation-delay: 0;
    mix-blend-mode: overlay;
  }

  & div:nth-child(2) {
    animation-delay: -5s;
    & img {
      mix-blend-mode: overlay;
    }
  }

  @media (min-width: 768px) {
    max-width: 80%;
  }
}
</style>

<template>
  <figure>
    <div>
      <img rel="preload" :src="props.posterImages[0].url" :alt="props.posterImages[0].alt">
      <img rel="preload" :src="props.posterImages[1].url" :alt="props.posterImages[1].alt">
    </div>
    <div>
      <img rel="preload" :src="props.posterImages[1].url" :alt="props.posterImages[1].alt">
      <img rel="preload" :src="props.posterImages[0].url" :alt="props.posterImages[0].alt">
    </div>
  </figure>
</template>
