<style scoped>

@keyframes flash {
  from {
    border-color: var(--black-mute);
  }

  to {
    border-color: #FFF5C3;
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
  @media (min-width: 768px) {
    max-width: 100%;
  }
}
</style>

<template>
  <figure>
    <img src="" alt="Movie Poster 1" />
    <img src="" alt="Movie Poster 2" />
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </figure>
</template>
