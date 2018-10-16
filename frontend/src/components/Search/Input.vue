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

input {
    margin: auto;
    outline: none;
    font: inherit;
    transition: border 0.3s ease-in;
}

input:active, input:focus {
    border: 1px solid var(--theme-light);
}

input {
    border-radius: 0.2em;
    border: var(--border);
}

input {
    padding: 10px 20px;
}

@media screen and (max-width: 740px) {
    input {
        padding: 10px;
    }
}

</style>
