<template>
  <div class="promo-tile">
    <p class="promo-tile__icon">
      <i :class="['material-icons', icon.color]">{{ icon.name }}</i>
    </p>
    <h3 class="promo-tile__header">{{ title }}</h3>
    <p class="promo-tile__copy">{{ copy }}</p>
    <router-link class="promo-tile__link" v-if="link" :to="{ path: link.path }">
      {{ link.copy }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      name: String,
      color: String
    },
    title: String,
    copy: String,
    link: {
      copy: String,
      path: String
    }
  }
}
</script>

<style scoped>
.promo-tile {
  text-align: center;
  padding: 10px 20px;
  min-height: 250px;
  margin: auto;
}

.promo-tile__header {
  font: var(--header-3);
  font-weight: bold;
}

.promo-tile__copy {
  color: var(--soft-black);
}

.promo-tile__link {
  color: var(--theme);
}

.promo-tile__icon .material-icons {
  font-size: var(--font-large);
}

/* clean these guys up later */
@media screen and (min-width: 1100px) {
  .promo-tile {
    width: auto;
  }
}

@media screen and (max-width: 1100px) {
  .promo-tile {
    width: 200px;
  }
}

/* tablet and below */
@media screen and (max-width: 820px) {
  .promo-tile {
    width: 300px;
  }
}

@media screen and (max-width: 500px) {
  .promo-tile {
    width: 220px;
  }
}
</style>
