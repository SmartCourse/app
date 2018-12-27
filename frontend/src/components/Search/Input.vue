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

<<<<<<< HEAD
input[type="search"] {
=======
input {
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    margin: auto;
    outline: none;
    font: inherit;
    transition: border 0.3s ease-in;
<<<<<<< HEAD
    appearance: none;
}

input[type="search"]:active, input[type="search"]:focus {
    border: 1px solid var(--theme-light);
}

input[type="search"] {
=======
}

input:active, input:focus {
    border: 1px solid var(--theme-light);
}

input {
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    border-radius: 0.2em;
    border: var(--border);
}

<<<<<<< HEAD
input[type="search"] {
=======
input {
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
    padding: 10px 20px;
}

@media screen and (max-width: 740px) {
<<<<<<< HEAD
    input[type="search"] {
=======
    input {
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
        padding: 10px;
    }
}

</style>
