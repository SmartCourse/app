<template>
    <div id="nav">
      <router-link class="link-item" to="/">
          <AppLogo :first="'S'" :last="'C'"/>
      </router-link>
      <div class="links">
        <Search class="mini" v-if="$route.name !== 'home'"/>
        <!-- hacky padding div -->
        <div v-else/>
        <h3 v-if="!isLoggedIn"><router-link class="link-item" to="/login">Login</router-link></h3>
        <h3 v-if="!isLoggedIn"><router-link class="link-item" to="/signup">Sign Up</router-link></h3>
        <h3 v-else @click="this.$store.dispatch('auth/logout')" class="link-item">Logout</h3>
      </div>
    </div>
</template>

<script>
import Search from '@/components/AppSearch'
import {mapGetters} from 'vuex'

export default {
  components: { Search },
  computed: {
      ...mapGetters('auth', ['isLoggedIn'])
  },
}
</script>

<style lang="less" scoped>

#nav {
    display: flex;
    padding: 0px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    background-color: var(--white);
    font-size: var(--font-small);
}

.links {
    /* should be flex will require less hacks */
    display: grid;
    grid-column-gap: 5px;
    grid-template-columns:  5fr 1fr 1fr;
    h3 {
        text-align: center;
        align-self: center;
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

    .links {
        grid-template-columns:  3fr 1fr 1fr;
    }
}
</style>
