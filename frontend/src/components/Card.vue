<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
  position: relative;
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-gap: 10px;
  margin: 10px 0px;
  border: 2px solid #f5f5f5;
  padding: 10px;
}

.card div > *:first-child {
  margin-top: 0;
  line-height: 24px;
}
</style>




