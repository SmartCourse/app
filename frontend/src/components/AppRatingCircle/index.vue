<template>
    <svg version="1.1" class="svg-loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
     y="0px" viewBox="0 0 80 80" xml:space="preserve">
     <g>
        <path stroke="grey" stroke-width="5px" fill="none" id="spinner" v-bind:d="backgroundPath"></path>
        <text text-anchor="middle" alignment-baseline="central" x="40" y="40">10</text>
        <path stroke="var(--theme)" stroke-width="5px" fill="none" id="spinner" d="M40 20 A 20 20, 0, 0, 1 40 60"></path>
     </g>
    </svg>
</template>

<script>
export default {
  data() {
    return {
      cx: 40,
      cy: 40,
      r: 20
    }
  },
  computed: {
    backgroundPath() {
      const { cx, cy, r } = this
      return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`
    },
    foregroundPath() {
      // const { cx, cy, r } = this
      return 1
    }
  }
}
</script>
