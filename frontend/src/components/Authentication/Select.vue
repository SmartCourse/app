<template>
    <div class="select-style material-icons">
        <select  :value="value" @input="$emit('input', $event.target.value)">
            <option value="" disabled>{{ placeholder }}</option>
            <option
                v-for="item in items"
                :key="item"
                :value="item"
            >
                {{ item }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
  props: ['value', 'items', 'placeholder']
}
</script>

<style scoped>
.select-style {
    border-bottom: 1px solid var(--color-light-gray);
    width: 100%;
    overflow: hidden;
}

.select-style::after {
    position: absolute;
    transform: translateX(-30px) translateY(10px);
    pointer-events: none;
    /* unicode material-icon for down arrow */
    content: '\e5c5';
}

.select-style select {
    font: var(--body-copy-1);
    padding: 10px 30px 10px 0px;
    border: none;
    width: 100%;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
}

.select-style select:focus {
    outline: none;
    border-bottom: 1px solid var(--theme-light);
}

</style>
