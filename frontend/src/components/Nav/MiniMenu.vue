<template>
  <div class="mini-menu">
    <i class="material-icons">{{ toggled ? 'close' : 'menu'}}</i>
    <div :class="['mini-menu__items', toggled ? 'toggled' : 'closed' ]">
      <slot/>
      <router-link v-for="item in items"
        :key="item.text"
        :to="item.to"
        class="link-item"
      >
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggled: Boolean,
    items: Array
  },
  mounted() {
    console.info(this.items)
  }
}
</script>

<style scoped>

@keyframes slide-in {
    from {
        transform: translate(180px, 0);
    }

    to {
        transform: translate(0, 0);
    }
}

@keyframes slide-out {
    from {
        transform: translate(0, 0);
    }

    to {
        transform: translate(180px, 0);
    }
}

.mini-menu {
  position: relative;
  display: none;
}

.material-icons {
  user-select: none;
}

.mini-menu__items {
  background-color: var(--white);
  border: var(--border);
  position: absolute;
  top: 43px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 180px;
  right: -20px;
}

.toggled {
  animation: slide-in 0.5s forwards;
}

.closed {
  animation: slide-out 0.5s forwards;
}

@media screen and (max-width: 768px) {
  .mini-menu {
    display: flex;
  }
}
</style>
