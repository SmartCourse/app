<template>
  <div id="nav">
    <div class="logo-span">
      <router-link class="link-item" to="/">
        <AppLogo :first="'S'" :last="'C'"/>
      </router-link>
    </div>
    <div class="links">
      <Search class="mini" v-if="$route.name !== 'home'"/>
      <div class="nav-menu">
        <div class="menu-items">
          <router-link tag="h3"
            class="link-item"
            v-for="item in menuItems"
            :key="item.text"
            :to="item.to">
            {{ item.text }}
          </router-link>
          <h3 v-if="isFirebaseAuthorised" @click="logout()" class="link-item">Logout</h3>
        </div>
        <MiniMenu
          :toggled="toggled"
          :items="menuItems"
          @click.native="toggleMenu"
          :logout="logout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import MiniMenu from '@/components/Nav/MiniMenu'
import { mapGetters } from 'vuex'

export default {
  components: { Search, MiniMenu },
  computed: {
    ...mapGetters('auth', ['isFirebaseAuthorised', 'isLoggedIn', 'hasProfile']),
    menuItems() {
      const self = this
      return [
        ...self.notFirebased.filter(() => !self.isFirebaseAuthorised),
        ...self.noProfile.filter(() => self.isFirebaseAuthorised && !self.hasProfile),
        ...self.loggedIn.filter(() => self.isLoggedIn)
      ]
    }
  },
  data() {
    return {
      toggled: false,
      notFirebased: [
        {
          text: 'Login',
          to: '/login'
        },
        {
          text: 'Sign Up',
          to: '/signup'
        }
      ],
      noProfile: [
        {
          text: 'Complete Sign Up',
          to: '/create-profile'
        }
      ],
      loggedIn: [
        {
          text: 'Profile',
          to: '/profile'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    toggleMenu() {
      this.toggled = !this.toggled
    }
  }
}
</script>

<style lang="less" scoped>
#nav,
.menu-items,
.nav-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  font-size: var(--font-small);
}

#nav {
  padding: 0px 20px;
  border-bottom: var(--border);
}

.logo-span {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.links {
  /* should be flex will require less hacks */
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3 {
    font: var(--header-4);
    cursor: pointer;
    margin: auto 10px;
    text-align: center;
    display: inline-block;
  }
  h3:first-of-type {
    color: var(--theme);
  }
}

@media screen and (max-width: 768px) {
  #nav {
    font-size: var(--font-small-mobile);
  }

  .menu-items .link-item {
    font: var(--body-copy-1);
  }

  .nav-menu .menu-items {
    display: none;
  }
}
</style>
