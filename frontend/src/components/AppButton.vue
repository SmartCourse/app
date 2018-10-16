<template>
    <div>
      <div v-if="disabled" class="tooltip-wrapper disabled" v-tooltip="disabledMsg">
        <button type=button :class="alt ? 'standard-button' : 'alt-button'" disabled>
            <slot></slot>
        </button>
      </div>
      <div v-else>
        <button type=button :class="alt ? 'standard-button' : 'alt-button'" >
            <slot></slot>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    alt: {
      type: Boolean,
      default: true
    },
    disabledMsg: String,
    disabled: Boolean
  }
}
</script>

<style scoped>
button {
    cursor: pointer;
    padding: 10px 20px;
    margin: 4px;
    font: inherit;
    font-weight: bolder;
    outline: none;
    border-radius: 4px;
    transition: box-shadow 0.1s ease-in-out;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    box-shadow: none;
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
    background: var(--white);
}

.alt-button:hover {
    box-shadow: var(--box-shadow-active);
}

.tooltip-wrapper {
  display: inline-block;
}

.tooltip {
  display: block !important;
}
</style>
