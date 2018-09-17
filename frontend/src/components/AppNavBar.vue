<template>
    <div id="nav">
      <router-link class="link-item" to="/">
          <AppLogo :first="'S'" :last="'C'"/>
      </router-link>
      <div class="links">
        <Search class="mini"/>
        <h3><router-link class="link-item" to="/">Login</router-link></h3>
        <h3><router-link class="link-item" to="/">Sign Up</router-link></h3>
      </div>
    </div>
</template>

<script>
import Search from '@/components/AppSearch'

export default {
  components: { Search }
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
