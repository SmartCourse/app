<template>
    <div class="container">
        <div :style="`width:${barWidth}%;`" class="bar"></div>
    </div>
</template>

<script>
export default {
  props: {
    value: Number
  },
  computed: {
    barWidth() {
      const { value = 50 } = this

      return value
    }
  }
}
</script>

<style scoped>
.container {
    margin: auto;
    height: 5px;
    background-color: var(--color-light-gray);
    width: 100%;
}

.bar {
    height: inherit;
    transition: width 1s ease-in-out;
    background-color: var(--theme);
}
</style>
