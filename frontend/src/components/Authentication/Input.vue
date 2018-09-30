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
  font: inherit;
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  border-style: none;
  outline: none;
  border-bottom: 1px solid var(--color-light-gray);
}
</style>


