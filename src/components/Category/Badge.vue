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
  color: var(--white);
}
</style>
