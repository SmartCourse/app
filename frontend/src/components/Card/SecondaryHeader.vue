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
<<<<<<< HEAD
  margin: 0;
=======
  margin: 0 5px;
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
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
