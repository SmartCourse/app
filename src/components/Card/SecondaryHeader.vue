<template>
    <router-link tag="div" class="header" :to="{ name: routeName, params: { code, id }}">
        <h3 class="header-title">
            <slot/>
        </h3>
    </router-link>
</template>

<script>
export default {
  props: {
    routeName: String,
    code: String,
    id: String
  }
}
</script>

<style scoped>

h3 {
  font: var(--header-4);
  font-weight: bolder;
  margin: 0;
}

.header-title:hover {
  cursor: pointer;
  opacity: 0.5;
}

@media screen and (max-width: 500px) {
  h3 {
    font: var(--header-4-mobile);
    font-weight: bolder;
  }
}
</style>
