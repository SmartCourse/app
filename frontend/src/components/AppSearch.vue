<template>
    <div class="search">
        <input
            type='text'
            v-model='search'
            name='search'
            placeholder='Search all courses...'
        />
        <ul v-if="search && suggestions.length">
            <router-link
                @click.native="resetSearch()"
                :key="item.code"
                tag="li"
                v-for="item in suggestions"
                :to="{ path: `/course/${item.code}` }"
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
      search: ''
    }
  },

  computed: {
    courses() {
      return this.$store.state.courses.map(item => item)
    },
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
    this.$store.dispatch('populateSearch')
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
        width: 300px;
    }

    & ul {
        width: 340px;
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
    position: absolute;
    background: var(--white);
    width: 540px;
    z-index: 10;
    max-height: 220px;
    overflow-y: scroll;
}

li {
    background: var(--white);
    font-size: 0.8em;
}

li:hover {
    background: var(--theme-light);
}

@media screen and (max-width: 740px) {
    ul {
        width: 350px;
    }

    input {
        width: 310px;
    }

    .mini {

        & input {
            width: 100px;
        }

        & ul {
            width: 140px;
        }
    }

}

</style>
