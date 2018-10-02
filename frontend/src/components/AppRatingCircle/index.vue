<template>
    <svg version="1.1" class="svg-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px" viewBox="0 0 80 90" xml:space="preserve">
     <g>
        <circle stroke="var(--color-light-gray)" fill="none" v-bind:r="r" :cx="cx" :cy="cy"/>
        <text text-anchor="middle" alignment-baseline="central" x="40" y="40">{{ value }}</text>
        <circle stroke="var(--theme)" v-bind:r="r" :cx="cx" :cy="cy"
            :transform="`rotate(-90 ${cx} ${cy})`"
            :stroke-dasharray="circumfrence"
            :stroke-dashoffset="rating"/>
     </g>
     <text v-if="text" class="description" alignment-baseline="central" x="40" y="80" text-anchor="middle">{{ text }}</text>
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
      r: 25,
      rating: 0
    }
  },
  computed: {
    circumfrence() {
      return 2 * Math.PI * this.r
    },
  },
  methods: {
    calcRating() {
      return ((100 - this.value) / 100) * this.circumfrence
    }
  },
  mounted() {
    this.rating = this.circumfrence
    setTimeout(() => {
      this.rating = this.calcRating()
    })
  }
}
</script>

<style scoped>

svg {
  font: var(--body-copy-1);
  height: inherit;
}

circle {
    fill: none;
    stroke-width: 5px;
    transition: all 3s ease-in-out;
}

text {
    stroke: var(--black);
    stroke-width: 0px;
}
</style>
