<script setup>
import HeadingComponent from '../components/HeadingComponent.vue';
</script>

<style scoped>
main {
  display: block;
}

h1, h2 {
  text-align: center;
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

hr {
  margin: 40px 0;
}

details {
  margin-top: 2rem;
}

summary {
  cursor: pointer;
}

</style>

<template>
  <main>
    <section>
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
    <hr>
  </section>
  <section>
    <HeadingComponent>
      <h2>Example</h2>
    </HeadingComponent>

    <div>
      <p><b>Plot Synopsis:</b></p>
      <p><small>Four women reminisce on one eventful summer in the 1970s when they were 12 years old. One of the girls fathers is a U.S. Army Officer serving in the Vietnam War who is tasked with killing a renegade Colonel who thinks he is a god.</small></p>
    </div>
    
    <details>
      <summary><b>Show Answer</b></summary>
      <p>Apocalypse <strong>Now</strong> and Then</p>
      <p><small><i><strong>Now</strong> is the <strong>last</strong> work of the 1st movie (Apocalypse Now) and also the <strong>last</strong> word of the 2nd movie (Now and Then).</i></small></p>
    </details>
  </section>
  </main>
</template>