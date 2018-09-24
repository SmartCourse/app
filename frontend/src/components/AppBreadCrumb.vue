<template>
    <ul v-if="routeList" class="breadcrumb">
        <li :key="item.id" v-for="item in routeList">
            <router-link tag="a" :to="item.route">{{ item.text }}</router-link>
        </li>
    </ul>
</template>

<script>
export default {

  // TODO acquire list of subjects from api (see AppSearch), and store them in data

  computed: {
    routeList() {
      // e.g. Subjects > Computer Science > COMP4920 > Ask Question

      let id = 0
      // TODO this won't be just Home in the final version prob
      const list = [{id: id++, text: 'Home', route: '/'}]

      if (this.$route.params.code) {
        const courseCode = this.$route.params.code
        list.push({id: id++, text: courseCode, route: `/course/${courseCode}`})
      }

      const map = {
        'newQuestion': 'Ask Question',
        'newReview': 'Add Review',
        'question': 'View Question',
        'review': 'View Review'
      }
      if (this.$route.name in map) {
        list.push({id: id++, text: map[this.$route.name], route: this.$route.path})
      }
      return list
    }
  }
}
</script>

<style scoped lang='less'>

.breadcrumb {
    padding: 10px 20px;
    color: var(--theme);
}

.breadcrumb > li {
    display:inline;
}

.breadcrumb > li+li:before {
    padding: 10px;
    color: var(--soft-black);
    content: ">";
}

</style>
