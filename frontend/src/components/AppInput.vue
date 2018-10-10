<template>
  <input :value="value" type="text" @input="$emit('input', $event.target.value)"/>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>
input[type=text] {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  width: calc(100% - 20px);
  height: 20px;
  transition: 0.2s border ease-in-out;
}

input[type=textarea] {
  border: var(--border);
  border-radius: 2px;
  font: inherit;
  resize: none;
  padding: 10px;
  outline: none;
  margin: 10px 0px;
  width: calc(100% - 20px);
  height: 100px;
  transition: 0.2s border ease-in-out;
}

input:active, input:focus {
  border: 1px solid #acc;
}
</style>
