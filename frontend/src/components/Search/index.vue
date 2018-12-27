<template>
    <div class="search">
        <SearchBar
            class="search-bar"
            v-model='search'
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
import SearchBar from './Input'
import { mapGetters } from 'vuex'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      search: ''
    }
  },

  computed: {
    suggestions() {
      // Give higher preference to course code before course name
      const lower = this.search.toLowerCase()
      return this.courses
        .filter(item => item.code.toLowerCase().match(lower))
        .concat(this.courses
          .filter(item => item.name.toLowerCase().match(lower)))
        .slice(0, 5)
    },
    ...mapGetters(['loading', 'courses'])
  },

  methods: {
    resetSearch() { this.search = '' }
  }
}
</script>

<style lang='less' scoped>

.search {
    position: relative;
    font-size: var(--font-medium);
    margin: 10px auto;
}

.search-bar, ul {
    width: 500px;
}

.mini {
    font-size: 1em;

    & .search-bar, ul {
        width: 300px;
    }
}

ul {
    border-radius: 0.2em;
    border: var(--border);
    position: absolute;
    background: var(--white);
    z-index: 10;
    max-height: 220px;
    overflow-y: scroll;
}

li {
    padding: 10px 20px;
    background: var(--white);
    font-size: 0.8em;
}

li:hover {
    background: var(--theme-light);
}

@media screen and (max-width: 740px) {
    .search {
        font: var(--header-4);
    }

    ul, .search-bar {
        width: 330px;
    }

    .mini {
        font-size: var(--body-copy-1);

        & ul, .search-bar {
            width: 180px;
        }
    }

}

</style>
