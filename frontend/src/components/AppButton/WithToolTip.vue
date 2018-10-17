<template>
    <div class="tooltip-wrapper disabled" v-tooltip="disabledMsg">
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
        alt: Boolean,
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


