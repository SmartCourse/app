<template>
    <Category class="semester">
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
.semester {
  background-color: var(--color-purple);
  color: var(--white);
}
</style>
