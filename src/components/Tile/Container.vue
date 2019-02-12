<template>
<div class="tile-page">
  <div class="tiles-container">
    <slot></slot>
  </div>
</div>
</template>

<style lang="less" scoped>
.tile-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 2px;
    padding: 0 10px;
    min-height: 50vh;
}

.tiles-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
