<template>
    <input
        type='search'
        name='search'
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>

input[type="search"] {
    margin: auto;
    outline: none;
    font: inherit;
    transition: border 0.3s ease-in;
    appearance: none;
}

input[type="search"]:active, input[type="search"]:focus {
    border: 1px solid var(--theme-light);
}

input[type="search"] {
    border-radius: 0.2em;
    border: var(--border);
}

input[type="search"] {
    padding: 10px 20px;
}

@media screen and (max-width: 740px) {
    input[type="search"] {
        padding: 10px;
    }
}

</style>
