<template>
    <svg version="1.1" class="svg-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px" viewBox="0 0 80 80" xml:space="preserve">
     <g>
        <path stroke="grey" fill="none" v-bind:d="backgroundPath"></path>
        <text text-anchor="middle" alignment-baseline="central" x="40" y="40">{{ percent }}</text>
        <circle v-bind:r="r" :cx="cx" :cy="cy"
            :transform="`rotate(-90 ${cx} ${cy})`"
            :stroke-dasharray="circumfrence"
            :stroke-dashoffset="rating"/>
     </g>
    </svg>
</template>

<script>
export default {
  data() {
    return {
      cx: 40,
      cy: 40,
      r: 20,
      percent: 80
    }
  },
  computed: {
    backgroundPath() {
      const { cx, cy, r } = this
      return `M ${cx} ${cy} m -${r}, 0 a ${r} ${r} 0 1 1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`
    },
    circumfrence() {
      return 2 * Math.PI * this.r
    },
    rating() {
      return ((100 - this.percent) / 100) * this.circumfrence
    }
  }
}
</script>

<style scoped>
path, circle {
    fill: none;
    stroke-width: 5px;
}

text {
    stroke: var(--black);
    stroke-width: 0px;
}

circle {
    stroke: var(--theme);
}
</style>
