<template>
  <div :class="recommendClass">
    <!-- insert text node here -->
    <slot/>
  </div>
</template>

<script>

export default {
  props: {
    recommend: {
      type: [Boolean, Number],
      required: true
    }
  },
  computed: {
    recommendClass() {
      let value
      if (typeof(this.recommend) === 'number') {
        value = Number(this.recommend)/100
      } else {
        value = Number(this.recommend)
      }

      if (value >= 0.6) return 'positive'
      else if (value <= 0.4) return 'negative'
      else return 'neutral'
    },
  }
}
</script>

<style scoped>
p, h6 {
  color: inherit;
  margin: 0;
}

.positive {
  color:var(--color-positive);
}

.neutral {
  color:var(--soft-black);
}

.negative {
  color:var(--color-negative);
}
</style>
