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

    background: url("https://s3.amazonaws.com/nightjarprod/content/uploads/sites/249/2024/08/12152309/q31Ks8oAmM4Nq2CcGjyYYpdBAmh-scaled.jpg"), url("https://lionsgate.brightspotcdn.com/4c/7a/12a223204a37817b83b701111d4f/apocalypse-now-movie-poster-01.jpg");
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

    background: url("https://lionsgate.brightspotcdn.com/4c/7a/12a223204a37817b83b701111d4f/apocalypse-now-movie-poster-01.jpg"), url("https://s3.amazonaws.com/nightjarprod/content/uploads/sites/249/2024/08/12152309/q31Ks8oAmM4Nq2CcGjyYYpdBAmh-scaled.jpg");
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
  <figure>
    <div></div>
    <div></div>
  </figure>
</template>
