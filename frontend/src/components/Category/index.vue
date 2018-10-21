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
  color:rgba(1, 151, 1, 0.5);
}

.negative {
  color: rgba(200, 0, 0, 0.5);
}
</style>
