<template>
  <div class="options">
      <AppButton
          @click.native="clickEventHandler(option)"
          :alt="value === option"
          :key="option"
          class="option"
          v-for="option in options"
          style="font-weight: normal"
      >
          {{ option }}
      </AppButton>
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
    display: grid;
    grid-auto-columns: 1fr;
    grid-gap: auto;
}

.option {
  grid-row: 1;
}
</style>
