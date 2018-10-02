<template>
    <button type='button' :class="alt ? 'standard-button' : 'alt-button'">
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    alt: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
button {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0px 4px;
    font: inherit;
    font-weight: bolder;
    outline: none;
    border-radius: 4px;
    transition: box-shadow 0.2s ease-in-out;
}

.standard-button {
    background-color: var(--theme);
    color: var(--white);
    border: none;
}

.standard-button:hover {
    box-shadow: 0px 0px 0px 1px var(--theme-light);
}

.alt-button {
    color: var(--theme);
    border: var(--border-dark);
}

.alt-button:hover {
    box-shadow: var(--box-shadow-active);
}
</style>
