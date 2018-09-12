<template>
    <div class="search">
        <input
            type='text'
            v-model='search'
            name='search'
            placeholder='Search...'
        />
        <ul v-if="search && suggestions.length">
            <router-link
                @click.native="resetSearch()"
                :key="item.courseID"
                tag="li"
                v-for="item in suggestions"
                :to="{ path: `/course/${item.courseID}` }"
            >
                {{ item.name }} ({{ item.code }})
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      courses: []
    }
  },

  computed: {
    suggestions() {
      const lower = this.search.toLowerCase()
      return this.courses
        .filter(item => item.tags.match(lower))
        .slice(0, 5)
    }
  },

  methods: {
      resetSearch() { this.search = '' }
  },

  created() {
    fetch('http://localhost:3000/api/course')
      .then(response => response.json())
      .then(data => {
          this.courses = data
      })
      .catch(err => console.warn(err))
  }
}
</script>

<style lang='less' scoped>

.search {
    position: relative;
    font-size: 0.7em;
    margin: 20px auto;
}

input {
    margin: auto;
    outline: none;
    font: inherit;
    width: 500px;
}

.mini {
    font-size: 1em;

    & input {
        width: 240px;
    }

    & ul {
        width: 280px;
    }
}

ul, input {
    border-radius: 0.2em;
    border: var(--border);
}

input, li {
    padding: 10px 20px;
}

ul {
    width: 540px;
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
}

li {
    font-size: 0.8em;
    background: white;
}

li:hover {
    background: var(--theme-light);
}

@media screen and (max-width: 400px) {
    ul {
        width: 350px;
    }

    input {
        width: 310px;
    }

}

</style>
