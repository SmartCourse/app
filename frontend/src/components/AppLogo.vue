<template>
  <h1 class="logo"><span>{{first}}</span><span class="course">{{last}}</span></h1>
</template>

<script>
export default {
  props: {
    first: {
      type: String,
      default: 'Smart'
    },
    last: {
      type: String,
      default: 'Course'
    }
  }
}
</script>

<style lang="less" scoped>

h1 {
  margin: 15px 0;
}

h1 span {
    padding: 0.15em 0.1em;
}

.course {
  color: var(--white);
  background-color: var(--theme);
}

</style>
