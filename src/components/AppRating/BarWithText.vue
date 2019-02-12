<template>
    <div class="bar" >
        <h2 class="rating-text">{{ rating && rating.text }} </h2>
        <Bar  :value="rating.value"/>
    </div>
</template>

<script>
import Bar from '@/components/AppRating/Bar'

export default {
  props: {
    rating: {
      text: String,
      value: Number
    }
  },
  components: {
    Bar
  }
}
</script>

<style scoped>
.bar {
  display: grid;
  grid-auto-columns: 1fr 2fr;
}

.bar > * {
    grid-row: 1;
}

.rating-text {
  margin: 0;
  font: var(--body-copy-2);
}
</style>
