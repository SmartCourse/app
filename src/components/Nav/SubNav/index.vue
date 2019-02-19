<template>
    <div class="sub-nav">
        <TabButton class="sub-nav__button"
            v-for="route in routes"
            :key="route.name"
            :to="{ name: route.name }"
            :active="isActiveRoute(route.name)"
            @click.native="$router.push({ name: route.name })"
        >
            {{ route.name }}
        </TabButton>
    </div>
</template>

<script>
import TabButton from '@/components/Course/TabButton'

export default {
  props: {
    routes: Array
  },
  components: {
    TabButton
  },
  methods: {
    isActiveRoute(name) {
      return this.$route.name === name
    }
  }
}
</script>

<style scoped>
.sub-nav {
    padding: 2.5px 20px;
    background-color: #555;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.sub-nav__button {
    color: var(--white);
}

</style>
