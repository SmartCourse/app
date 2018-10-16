<template>
    <div>
        <p class="reputation">
            <slot/>
            <i class="material-icons">star</i>
        </p>
    </div>
</template>

<style scoped>

.reputation {
    margin: 0 5px;
    font: var(--body-copy-2);
}

.material-icons {
    width: 16px;
    height: 16px;
    font-size: inherit;
    vertical-align: middle;
}

</style>
