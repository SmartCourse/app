<template>
    <svg version="1.1" class="svg-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px" viewBox="0 0 80 80" xml:space="preserve">
     <g>
        <path stroke="grey" stroke-width="5px" fill="none" id="spinner" v-bind:d="backgroundPath"></path>
        <text text-anchor="middle" alignment-baseline="central" x="40" y="40">{{ percent }}</text>
        <path stroke="var(--theme)" stroke-width="5px" fill="none" id="spinner" v-bind:d="foregroundPath"></path>
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
      percent: 40
    }
  },
  computed: {
    backgroundPath() {
      const { cx, cy, r } = this
      return `M ${cx} ${cy} m -${r}, 0 a ${r} ${r} 0 1 1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`
    },
    foregroundPath() {
      const { cx, cy, r, radians } = this
      return `M ${cx} ${cy} m 0, -${r} a ${r} ${r} 0 0 1 ${r + r*Math.cos(radians)},${-r + 2*r*Math.abs(Math.sin(radians))}`
    },
    radians() {
      return this.percent / 100 * Math.PI * 2
    }
  }
}
</script>
