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
    font: inherit;
    outline: none;
    transition: 0.2s ease-in-out box-shadow;
}

.tab-button-active {
    border-bottom: solid 5px var(--theme);
}

.tab-button {
    font-size:larger;
    background-color: white;
    color: black;
}

.tab-button:hover {
    border-bottom: solid 5px var(--theme-light);
}

</style>
