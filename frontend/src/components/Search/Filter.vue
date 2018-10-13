<template>
    <div class="search-container">
        <SearchBar class="filter-search"
            :value="value" @input="$emit('input', $event)"
            placeholder='Filter by keyword...'
        />
    </div>
</template>

<script>
import SearchBar from './Input'

export default {
  props: ['value'],
  components: {
    SearchBar
  }
}
</script>

<style scoped>

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-light);
    margin: 10px;
    padding: 40px 0;
}

.filter-search {
    width: 50%;
    border: none;
    border-radius: 0;
    box-shadow: none;
}

.filter-search:active, .filter-search:focus  {
    box-shadow: none;
    border: none;
}

@media screen and (max-width: 600px) {
    .filter-search {
        width: 80%;
    }
}

</style>
