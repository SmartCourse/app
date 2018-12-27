<template>
  <div class="options">
      <p
          @click="clickEventHandler(option)"
          :key="option"
          :class="['option', {'selected': value === option}]"
          v-for="option in options"
      >
          {{ option }}
      </p>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  props: ['value', 'options'],
  components: { AppButton },
  methods: {
    clickEventHandler(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.options {
  text-align: center;
  margin: 0 10px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 0 20px;
}

.option {
<<<<<<< HEAD
  border-bottom: 2.5px solid transparent;
  grid-row: 1;
  cursor: pointer;
  transition: border 0.2s ease-in-out;
=======
  border-bottom: 1px solid transparent;
  grid-row: 1;
  cursor: pointer;
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
}

.selected {
  color: black;
<<<<<<< HEAD
  border-bottom: 2.5px solid var(--theme);
=======
  border-bottom: 1px solid black;
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
}
</style>
