<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  position: relative;
  margin: 10px 0px;
  border: var(--border);
  border-radius: 2px;
  padding: 20px 10px;
  background-color:white;
}
</style>
