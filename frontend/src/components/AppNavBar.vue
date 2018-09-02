<template>
    <div id="nav">
      <AppLogo/>
      <div class="links">
        <router-link class="link-item" tag="h2" to="/">Home</router-link> |
        <router-link class="link-item" tag="h2" to="/about">About</router-link>
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
</style>
