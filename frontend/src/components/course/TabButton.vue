<template>
    <button :class="{ 'tab-button':true, 'tab-button-active':active }">
        <slot></slot>
    </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
button {
    border-radius:0px;
    border:none;
    cursor: pointer;
    padding: 10px 20px;
    font: var(--header-3);
    font-weight: bolder;
    outline: none;
}

.tab-button-active {
    border-bottom: solid 5px var(--theme);
}

.tab-button {
    background-color: var(--white);
    color: var(--black);
}

.tab-button:hover {
    border-bottom: solid 5px var(--theme-light);
}

</style>
