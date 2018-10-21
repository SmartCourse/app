<template>
  <input
    :value="value" class="auth-input"
    @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>
.auth-input {
  background-color: transparent;
  font: inherit;
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  outline: none;
  border-bottom: 1px solid var(--color-light-gray);
  transition: border 0.3s ease-in;
}

.auth-input:active, .auth-input:focus {
  border-bottom: 1px solid var(--theme-light);
}
</style>
