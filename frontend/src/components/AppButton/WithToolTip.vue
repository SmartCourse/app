<template>
    <AppButton
        :alt="alt"
        :disabled="disabled"
        :title="disabledMessage.content"
        :aria-disabled="disabled"
    >
        <slot></slot>
    </AppButton>
</template>

<script>
import AppButton from '.'

export default {
  components: {
    AppButton
  },
  props: {
    alt: { type: Boolean, default: true },
    disabledMessage: Object,
    disabled: Boolean
  }
}
</script>
