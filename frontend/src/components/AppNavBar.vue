<template>
    <div id="nav">
      <AppLogo :first="'S'" :last="'C'"/>
      <div class="links">
        <router-link class="link-item" tag="h2" to="/">Home</router-link> |
        <router-link class="link-item" tag="h2" to="/course">Course</router-link>
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
