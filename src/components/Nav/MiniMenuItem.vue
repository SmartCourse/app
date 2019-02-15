<template>
    <router-link
        :to="to"
        class="mini-menu__menu-item">
        <slot/>
    </router-link>
</template>

<script>
export default {
  props: {
    to: String
  }
}
</script>

<style scoped>
.mini-menu__menu-item {
  color: var(--soft-black);
  margin: 5px 0;
}

.mini-menu__menu-item:hover, .mini-menu__menu-item:active {
  color: var(--theme-light);
}
</style>
