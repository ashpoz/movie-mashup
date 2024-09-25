<script setup>
import { onMounted, ref, watch } from 'vue'
import HeadingComponent from './HeadingComponent.vue';
import IndividualHint from './IndividualHint.vue';

const props = defineProps({
  active: { type: Boolean },
  mashup: { type: Number },
})

const dialogRef = ref(null)
const currentHint = ref(0)
const hints = ref([])
const totalHints = 3

watch(props, (hintsActive) => {
  handleDialog(hintsActive)
})

watch(currentHint, () => {
  getHint()
})

function handleDialog(active) {
  if (active) {
    dialogRef.value.showModal()
  } else {
    dialogRef.value.close()
  }
}

function handleHintClick() {
  if (currentHint.value >= 3) return
  currentHint.value++
}

async function getHint() {
  if (currentHint.value > 3) return

  const response = await fetch(`./.netlify/functions/reveal-hint?mashup=${props.mashup}&hint=${currentHint.value}`)
  const json = await response.json()
  hints.value.push(json)
}

onMounted(() => {
  handleDialog()
})

</script>
<style scoped>
button[name="close"] {
  background: transparent;
  border: none;
  color: var(--color-text);
  display: flex;
  margin-left: auto;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  svg {
    stroke: var(--color-text);
  }
}

button[name="revealHint"] {
  margin-bottom: 1rem;
  margin-top: 2rem;
}

dialog {
  background-color: var(--color-background);
  color: var(--color-text);
  margin: auto;
  max-width: 600px;
  width: calc(100% - 2rem);

  &::backdrop {
    backdrop-filter: blur(10px);
  }
}

h2 {
  text-align: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-center {
  text-align: center;
}
</style>
<template>
  <dialog ref="dialogRef">
    <button name="close" @click="handleDialog(false)" aria-label="Close dialog">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="flex-col">
      <HeadingComponent>
        <h2>Hints</h2>
      </HeadingComponent>
      <p>Click the below button to reveal a hint. You get a total of 3 hints.</p>
      <div>
        <p class="text-center"><strong>Hints used:</strong></p>
        <IndividualHint
          :currentHint="currentHint"
          :hints="hints"
        />
        <div class="text-center">
          <span>{{ currentHint }}</span>
          /
          <span>{{ totalHints }}</span>
        </div>
      </div>
      <button name="revealHint" @click="handleHintClick" class="btn btn-primary" :disabled="currentHint >= totalHints">Reveal Hint</button>
    </div>
  </dialog>
</template>