<template>
  <div class="category">
    <!-- insert text node here -->
    <slot/>
  </div>
</template>

<style scoped>
p, h6 {
  font: inherit;
  color: inherit;
  margin: auto;
  line-height: 20px;
}

.category {
  font: var(--body-copy-3);
  font-weight: 600;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0.5em;
  border-radius: 4px;
}
</style>
