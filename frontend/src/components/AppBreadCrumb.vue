<template>
    <ul v-if="routeList" class="breadcrumb">
        <li :key="item.id" v-for="item in routeList">
            <router-link tag="a" :to="item.route">{{ item.text }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
  computed: {
    routeList() {
      // TODO this
      // e.g. Subject > COMP > Management and Ethics > Ask Question
      // i.e. need to use course store
      //this.$route.path.split("/")
      const list = []
      if (this.$route.params.code) {
          list.push({id:2, text:this.$store.state.course.course.name, route:"/"})
      }
      return [
          {id:0, text:"Subjects", route:"/"},
          {id:1, text:"COMP", route:"/"},
          ...list,
          {id:3, text:"Ask Question", route:"/"}]
    }
  }
}
</script>

<style scoped lang='less'>

.breadcrumb {
    padding: 10px;
    padding-left:20px;
    color: var(--theme);
}

.breadcrumb > li {
    display:inline;
}

.breadcrumb > li+li:before {
    padding: 8px;
    color: var(--soft-black);
    content: ">";
}

</style>
