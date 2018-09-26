<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  position: relative;
  margin-bottom: 10px;
  border: var(--border);
  border-radius: 2px;
  padding: 10px;
  background-color:var(--white);
}
</style>
