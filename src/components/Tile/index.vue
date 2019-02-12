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
  // box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

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
