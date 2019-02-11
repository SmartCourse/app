<template>
  <div class="mini-menu" @click="clickHandler">
    <i ref="toggle" class="material-icons">{{ toggled ? 'close' : 'menu'}}</i>
    <div :class="['mini-menu__items', toggled ? 'toggled' : 'closed' ]">
      <div class="section mini-menu__items--user">
        <h2>User</h2>
        <router-link
          v-for="item in items"
          :key="item.text"
          :to="item.to"
          class="menu-item"
        >{{ item.text }}</router-link>
      </div>
      <div class="section mini-menu__items--navigation">
        <h2>Navigation</h2>
        <router-link
          v-for="item in fixedItems"
          :key="item.text"
          :to="item.to"
          class="menu-item"
        >{{ item.text }}</router-link>
      </div>
      <div
        class="section mini-menu__items--logout"
        v-if="isFirebaseAuthorised"
        @click="logout">
        Logout
      </div>
      <div class="section mini-menu__items--feedback">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScVIOcc6y4MZ74YZeCu0Rpqg3VyTc7wtgE3ZQATBJC4f1YaRg/viewform?usp=sf_link" target="_blank">
          Submit Feedback
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    items: Array,
    logout: Function
  },
  data() {
    return {
      fixedItems: [
        { text: 'Home', to: '/' },
        { text: 'Subjects', to: '/subject' }
        /* { text: 'Feed', to: '/feed' } */
      ],
      toggled: false
    }
  },
  methods: {
    clickHandler(event) {
      const target = event.target
      if (target === this.$refs.toggle) {
        this.toggled = !this.toggled
      } else if (target.classList.contains('menu-item')) {
        this.toggled = false
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isFirebaseAuthorised'])
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
    width: 0;
  }
}

.mini-menu {
  position: relative;
  display: none;
  margin-left: 10px;
}

h2 {
  font: var(--header-3);
  margin: 10px 0;
  color: var(--theme);
}

.material-icons {
  user-select: none;
}

.section {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 10px;
  border-bottom: var(--border);
}

.mini-menu__items {
  background-color: var(--white);
  border: var(--border);
  position: absolute;
  /* feels dangerous */
  top: 43px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 180px;
  right: -20px;
  height: calc(100vh - 64px);
  overflow: hidden;
  z-index: 99;
}

.mini-menu__items--logout {
  /* color: var(--color-negative); */
}

.mini-menu__items--feedback {
  color: var(--color-red);
}

.menu-item {
  margin: 5px 0;
}

.menu-item:hover, .menu-item:active {
  color: var(--theme-light);
}

.toggled {
  animation: slide-in 0.3s forwards;
}

.closed {
  animation: slide-out 0.3s forwards;
}

@media screen and (max-width: 768px) {
  .mini-menu {
    display: flex;
  }
}
</style>
