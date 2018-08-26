<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="less">

html, body {
  margin: 0;
  padding: 0;
  font-size: medium;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

main {
  /* arbitrary */
  max-width: 768px;
  margin: auto;
}

ol, ul {
  margin: 0;
  padding: 0;
}

</style>
