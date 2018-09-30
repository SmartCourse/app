<template>
  <input type="text"/>
</template>

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

input:active, input:focus {
  border: 1px solid #acc;
}
</style>

