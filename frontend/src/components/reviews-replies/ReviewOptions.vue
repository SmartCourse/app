<template>
<div>
    <h4 class="options-header">
        <slot></slot>
    </h4>
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
.options-header {
    font: var(--header-4);
}

.options {
    display: grid;
    grid-auto-columns: 1fr;
    grid-gap: auto;
}

.option {
  grid-row: 1;
}
</style>
