<template>
  <h1 class="logo"><span>{{first}}</span><span class="course">{{last}}</span></h1>
</template>

<script>
export default {
  props: {
    first: String,
    last: String
  }
}
</script>

<style lang="less" scoped>

h1 span {
    padding: 0.15em 0.1em;
}

.course {
  color: white;
  background-color: var(--theme);
}

</style>
