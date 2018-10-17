<template>
    <div class="tooltip-wrapper" v-tooltip="disabledMessage">
        <AppButton :alt="alt" disabled>
            <slot></slot>
        </AppButton>
    </div>
</template>

<script>
import AppButton from '.'

export default {
  components: {
    AppButton
  },
  props: {
    alt: { type: Boolean, default: true },
    disabledMessage: Object
  }
}
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}

.tooltip {
  display: block !important;
}
</style>
