<template>
    <div class='options'>
        <div class="tabs">
            <slot/>
        </div>
        <router-link :to="{ name: routeName, params: {code} }">
            <AppButton> {{ buttonText }} </AppButton>
        </router-link>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  props: {
    code: String,
    routeName: String,
    buttonText: String
  },
  components: { AppButton }
}
</script>

<style scoped>
.options {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
