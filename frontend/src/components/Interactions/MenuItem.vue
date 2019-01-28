<template>
    <li class="menu-item">
        <button class="menu-button">
            <slot/>
        </button>
    </li>
</template>

<style scoped>
.menu-item {
    padding: 7px 0;
    border-bottom: var(--border);
}

.menu-item:last-child {
    border: none;
}

.menu-button {
    background: none;
    font: inherit;
    padding: 0;
    display: block;
    width: 100%;
    outline: none;
    border-radius: 0;
    border: none;
    cursor: pointer;
    text-align: left;
}

.menu-button:hover {
    color: var(--black);
}
</style>
