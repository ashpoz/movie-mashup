<script setup>
import { RouterLink } from 'vue-router'
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

nav a {
  align-items: center;
  color: var(--color-text);
  column-gap: 0.75rem;
  display: flex;
  flex: 1 0 auto;
  justify-content: flex-end;
  text-decoration: none;
}

nav a:first-child {
  flex: 1 0 50%;
  justify-content: flex-start;
}

svg {
  width: 2em;
}

.logo svg path {
  fill: var(--color-text);
}

nav a {
  font-weight: 900;
  text-transform: uppercase;
}
</style>

<template>
  <nav>
    <RouterLink to="/" class="logo">
      <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px" viewBox="0 0 15.222 15.222" style="enable-background:new 0 0 15.222 15.222;"
        xml:space="preserve">
        <g>
          <g>
            <path d="M13.485,7.377c0,0-8.05,0-10.267,0l0.343-0.244c2.549-1.472,8.188-5.01,8.188-5.01
			c0.234-0.136,0.314-0.436,0.18-0.67l-0.49-1.208c-0.136-0.234-0.436-0.314-0.671-0.179L1.49,5.703
			C1.256,5.839,1.177,6.14,1.311,6.374L2.2,7.337l0.007,7.395c0,0.271,0.22,0.49,0.49,0.49h10.788c0.271,0,0.49-0.219,0.49-0.49
			V7.867C13.975,7.597,13.755,7.377,13.485,7.377z M9.928,7.956L8.414,9.427H6.452l1.472-1.471H9.928z M9.289,1.407l1.74-1.117
			l-0.254,1.64L8.994,3.073L9.289,1.407z M6.187,3.316l1.771-1.103L7.64,3.873L5.871,4.977L6.187,3.316z M2.657,6.988l0.297-1.666
			l1.757-1.123L4.413,5.863L2.657,6.988z M4.492,7.956h1.961L4.982,9.427H3.021L4.492,7.956z M11.878,9.428H9.885l1.472-1.471h1.947
			L11.878,9.428z" />
          </g>
        </g>
      </svg>
      Movie Mashup
    </RouterLink>
    <RouterLink to="/game/how-to-play">
      How to Play
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    </RouterLink>
    <!-- <RouterLink to="/about">About</RouterLink> -->
  </nav>
</template>
