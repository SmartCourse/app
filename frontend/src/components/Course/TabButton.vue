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
    background: none;
    border-radius:0px;
    border: none;
    cursor: pointer;
    padding: 10px;
    font: var(--header-4);
    font-weight: bolder;
    outline: none;
}

.tab-button {
    border-bottom: solid 2.5px transparent;
    color: rgba(18,18,18, 0.4);
}

.tab-button-active {
    color: var(--black);
    border-bottom: solid 2.5px var(--theme);
}

.tab-button:hover {
    border-bottom: solid 2.5px var(--theme-light);
}

@media screen and (max-width: 600px) {
    button {
        font: var(--header-4-mobile);
        font-weight: bold;
    }
}

</style>
