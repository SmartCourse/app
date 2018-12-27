<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  position: relative;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 15px;
  background-color:var(--white);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
</style>
