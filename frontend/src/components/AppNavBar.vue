<template>
    <div id="nav">
      <router-link class="link-item" to="/">
          <AppLogo :first="'S'" :last="'C'"/>
      </router-link>
      <div class="links">
        <Search class="mini" v-if="$route.name !== 'home'"/>
        <!-- hacky padding div -->
        <div v-else/>
        <span v-if="!loading">
            <h3 v-if="!isLoggedIn"><router-link class="link-item" to="/login">Login</router-link></h3>
            <h3 v-if="!isLoggedIn"><router-link class="link-item" to="/signup">Sign Up</router-link></h3>
            <h3 v-if="isLoggedIn && !hasProfile"><router-link class="link-item" to="/signup">Profile</router-link></h3>
            <h3 v-if="hasProfile"><router-link class="link-item" to="/profile">Profile</router-link></h3>
            <h3 v-if="isLoggedIn" @click="$store.dispatch('auth/logout')" class="link-item">Logout</h3>
        </span>
        <span v-else>
            <LoadingSpinner style="height:50px;"/>
        </span>
      </div>
    </div>
</template>

<script>
import Search from '@/components/AppSearch'
import { mapGetters } from 'vuex'

export default {
  components: { Search },
  computed: {
    ...mapGetters([ 'isLoggedIn', 'hasProfile' ]),
    ...mapGetters('auth', [ 'loading' ])
  }
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
}
</style>
