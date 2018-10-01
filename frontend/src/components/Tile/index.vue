<template>
<div class="tile">
  <slot></slot>
</div>
</template>

<style lang="less" scoped>

.tile {
  position: relative;
  margin-bottom: 0.5em;
  border: var(--border);
  border-radius: 2px;
  background-color: var(--white);

  flex: 0 49%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: min-content;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
}
</style>
