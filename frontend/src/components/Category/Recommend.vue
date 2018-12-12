<template>
    <Category :class="recommendClass">
        <slot/>
    </Category>
</template>

<script>
import Category from '.'

export default {
  components: { Category },
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
.positive {
  background-color: var(--color-positive);
  color: var(--white);
}

.neutral {
  color:var(--soft-black);
}

.negative {
  background-color: var(--color-negative);
  color: var(--white);
}
</style>
