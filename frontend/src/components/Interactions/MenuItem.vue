<template>
    <li class="menu-item">
        <button class="menu-button">
            <slot/>
        </button>
    </li>
</template>

<style scoped>
.menu-item {
    border-bottom: var(--border);
}

.menu-item:last-child {
    border: none;
}

.menu-button {
    padding: 7px;
    background: none;
    font: inherit;
    display: block;
    width: 100%;
    outline: none;
    border-radius: 0;
    border: none;
    cursor: pointer;
    text-align: left;
    color: var(--soft-black);
}

.menu-button:hover, .menu-button:focus {
    color: var(--black);
}
</style>
