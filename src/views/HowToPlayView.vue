<script setup>
import HeadingComponent from '../components/HeadingComponent.vue';
</script>

<style scoped>
main {
  display: block;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

h1 {
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
  }
}

strong {
  text-decoration: underline;
}

ol {
  padding: 0 2rem;
}

li {
  margin-top: 2rem;

  &::marker {
    font-weight: 900;
  }
}
</style>

<template>
  <main>
    <HeadingComponent>
      <h1>How to Play</h1>
    </HeadingComponent>
    <ol>
      <li>First, you will be given a <strong>Plot Synopsis</strong>, which will be a combination of 2 movies plots
        mashed together.</li>
      <li>The <strong>last</strong> word of the <strong>1st movie's</strong> title should match the
        <strong>first</strong> word of the <strong>2nd movie's</strong> title (excluding articles like "a", "an", "the",
        and plurals).</li>
      <li>Enter the 1st movie and the 2nd movie into the form fields and hit <strong>Enter</strong>!</li>
    </ol>
  </main>
</template>