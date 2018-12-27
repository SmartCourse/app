<template>
<<<<<<< HEAD
  <div class="category">
=======
  <div :class="recommendClass">
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    <!-- insert text node here -->
    <slot/>
  </div>
</template>

<<<<<<< HEAD
<style scoped>
p, h6 {
  font: inherit;
  color: inherit;
  margin: auto;
  line-height: 20px;
}

.category {
  font: var(--body-copy-3);
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0.5em;
  border-radius: 4px;
=======
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
      if (typeof (this.recommend) === 'number') {
        value = Number(this.recommend) / 100
      } else {
        value = Number(this.recommend)
      }

      if (value >= 0.6) return 'positive'
      else if (value <= 0.4) return 'negative'
      else return 'neutral'
    }
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
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
}
</style>
