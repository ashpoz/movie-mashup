<script setup>
import { toRefs, ref, watch } from 'vue'

const props = defineProps({
  hints: { type: Array },
  currentHint: { type: Number },
})

const { hints, currentHint } = toRefs(props)

const years = ref([])
const credits = ref([])
const sharedWord = ref(null)

watch(hints, (newHints) => {
  if (!newHints || newHints === 0) return

  if (currentHint.value === 1) {
    years.value = newHints[0]
    console.log(years.value)
  }
  if (currentHint.value === 2) {
    credits.value = newHints[1]
    console.log(credits.value)
  }
  if (currentHint.value === 3) {
    sharedWord.value = newHints[2]
    console.log(sharedWord.value)
  }

},  
{ deep: true, immediate: true }
)

function formatArrAsList(arr) {
  if (!arr) return 

  console.log(arr.length)

  if (arr.length > 1) {
    let str = arr.join(',')
    const lastCommaIndex = str.lastIndexOf(',')
    str = str.substring(0, lastCommaIndex) + ' and ' + str.substring(lastCommaIndex + 1);
    return str
  } else {
    return arr.join('')
  }
}

</script>

<style scoped>
  ol li {
    margin-top: 1rem;
  }
</style>

<template>
  <ol>
    <li v-if="currentHint > 0">
      The 1st movie came out in <strong>{{ years[0] }}</strong>. The 2nd movie came out in <strong>{{ years[1] }}</strong>.
    </li>
    <li v-if="currentHint > 1">
      The 1st movie's top billed cast include <strong>{{ formatArrAsList(credits[0]?.cast) }}</strong> and is directed by <strong>{{ formatArrAsList(credits[0]?.directors) }}</strong>. 
      <br />
      The 2nd movie's top billed cast include <strong>{{ formatArrAsList(credits[1]?.cast) }}</strong> and is directed by <strong>{{ formatArrAsList(credits[1]?.directors) }}</strong>. 
    </li>
    <li v-if="currentHint > 2">
      The shared word for the movie mashup is <strong>{{ sharedWord?.shared_word }}</strong>
    </li>
  </ol>
</template>