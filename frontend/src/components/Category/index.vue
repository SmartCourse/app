<template>
    <p :class="positiveOrNegativeClass">
        <b>{{ positiveOrNegativeText }}</b>
    </p>
</template>

<script>

export default {
  props: {
    recommend: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    positiveOrNegativeText() {
      return this.recommend ? 'Recommended' : 'Not Recommended'
    },
    positiveOrNegativeClass() {
      return this.recommend ? 'positive' : 'negative'
    }
  }
}
</script>

<style scoped>
p {
    margin: 0;
}

.positive {
  color:var(--color-positive);
}

.negative {
  color:var(--color-negative);
}
</style>
