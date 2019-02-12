<template>
    <svg version="1.1" class="svg-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px" viewBox="0 0 80 80" xml:space="preserve">
     <g>
        <circle stroke="var(--color-light-gray)" fill="none" v-bind:r="r" :cx="cx" :cy="cy"/>
        <text text-anchor="middle" alignment-baseline="central" x="40" y="40">{{ value }}%</text>
        <circle stroke="var(--theme)" v-bind:r="r" :cx="cx" :cy="cy"
            :transform="`rotate(-90 ${cx} ${cy})`"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="rating"/>
     </g>
    </svg>
</template>

<script>
export default {
  props: {
    value: Number,
    text: String
  },
  data() {
    return {
      cx: 40,
      cy: 40,
      r: 30
    }
  },
  computed: {
    circumference() {
      return 2 * Math.PI * this.r
    },
    rating() {
      return ((100 - this.value) / 100) * this.circumference
    }
  }
}
</script>

<style scoped>
svg {
  max-width: 100%;
  height: inherit;
}

circle {
    fill: none;
    stroke-width: 5px;
    transition: stroke-dashoffset 3s ease-in-out;
}

text {
    font-family: inherit;
    font-size: inherit;
    stroke: var(--black-p);
    fill: var(--black-p);
    stroke-width: 0px;
}
</style>
