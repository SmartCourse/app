<template>
    <AppButton
        :alt="alt"
        :disabled="disabled"
        :aria-disabled="disabled"
        class="google__button"
    >
        <img class="google-logo" src="google-icon.svg"><slot></slot>
    </AppButton>
</template>

<script>
import AppButton from '.'

export default {
  components: {
    AppButton
  },
  props: {
    alt: { type: Boolean, default: false },
    disabled: Boolean
  }
}
</script>

<style scoped>

.google__button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px 0;
}
</style>
