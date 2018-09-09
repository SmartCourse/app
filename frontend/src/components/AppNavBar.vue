<template>
    <div id="nav">
      <router-link class="link-item" to="/">
          <AppLogo :first="'S'" :last="'C'"/>
      </router-link>
      <div class="links">
        <!--router-link class="link-item" to="/">Login</router-link-->
      </div>
    </div>
</template>

<style lang="less" scoped>

#nav {
    display: flex;
    padding: 0px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: var(--border);
    background-color: white;
}

.links {
    h2 {
        display: inline-block;
    }
}

@media screen and (max-width: 768px) {
    #nav {
        font-size: var(--font-small-mobile);
    }
}
</style>
