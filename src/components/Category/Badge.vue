<template>
    <Category class="badge">
        <slot/>
    </Category>
</template>

<script>
import Category from '.'

export default {
  components: { Category }
}
</script>

<style scoped>
.badge {
  background-color: var(--color-orange);
  color: var(--white);
}
</style>
