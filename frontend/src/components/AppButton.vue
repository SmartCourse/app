<template>
    <button :class="alt ? 'standard-button' : 'alt-button'">
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
    margin: 5px 10px;
    font: inherit;
    font-weight: bold;
    outline: none;
    border-radius: 4px;
    transition: 0.2s ease-in-out box-shadow;
}

.standard-button {
    background-color: var(--theme);
    color: white;
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
