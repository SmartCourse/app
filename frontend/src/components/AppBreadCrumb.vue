<template>
    <ul v-if="routeList" class="breadcrumb">
        <li :key="item.id" v-for="item in routeList">
            <router-link tag="a" :to="item.route">{{ item.text }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
        routeList: (() => {
          // TODO won't work this way... need to have something like:
          // e.g. Subject > COMP > Management and Ethics > Ask Question
          // i.e. need to use course store
          //this.$route.path.split("/")
          return [
              {id:0, text:"Subjects", route:"/"},
              {id:1, text:"COMP", route:"/"},
              {id:2, text:"Management and Ethics", route:"/"},
              {id:3, text:"Ask Question", route:"/"}]
        })()
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
