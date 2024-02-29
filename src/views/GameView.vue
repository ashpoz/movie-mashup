<script setup></script>
<style scoped>
main {
  grid-template-columns: 1fr;
}
section {
  margin: auto;
  max-width: 800px;
  width: 100%;
}
h1 {
  height: 1px;
  width: 1px;
  position: absolute;
  overflow: hidden;
  top: -10px;
}
fieldset {
  margin-top: 2rem;
  padding: 2rem;
}
legend {
  font-weight: bold;
}
label {
  font-size: 0.75em;
  font-weight: bold;
  text-decoration: underline;
}
input {
  margin-top: 2rem;
  padding: 1rem 2rem;
  width: 100%;
}
button {
  margin-top: 2rem;
}
</style>
<template>
  <main>
    <section>
      <h1>Movie Mashup Game</h1>
      <form>
        <fieldset>
          <legend>What is the movie?</legend>
          <label>Plot Synopsis:</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, veritatis similique.
            Corrupti ea voluptatem accusantium. Doloribus, nesciunt delectus similique eligendi
            dolores ducimus dignissimos necessitatibus ut nulla minus nobis quidem expedita?
          </p>
          <input type="text" />
          <button type="submit">Enter</button>
        </fieldset>
      </form>
    </section>
  </main>
</template>
