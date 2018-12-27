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
                <router-link tag="h3" v-if="!isFirebaseAuthorised" class="link-item" to="/login">Login</router-link>
                <router-link tag="h3" v-if="!isFirebaseAuthorised" class="link-item" to="/signup">Sign Up</router-link>
                <router-link tag="h3" v-if="isFirebaseAuthorised && !hasProfile" class="link-item" to="/create-profile">Create Profile</router-link>
                <router-link tag="h3" v-if="isLoggedIn" class="link-item" to="/profile">Profile</router-link>
                <h3 v-if="isFirebaseAuthorised" @click="logout()" class="link-item">Logout</h3>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import Search from '@/components/Search'
import { mapGetters } from 'vuex'

export default {
  components: { Search },
  computed: {
    ...mapGetters('auth', [ 'isFirebaseAuthorised', 'isLoggedIn', 'hasProfile' ])
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="less" scoped>

#nav, .menu-items, .nav-menu {
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
    justify-content: start;
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
}
</style>
