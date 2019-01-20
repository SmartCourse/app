<template>
    <div class="warning-container">
        <slot/>
    </div>
</template>

<style scoped>
.warning-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px auto;
    width: 340px;
    padding: 10px;
    text-align: center;
    background-color: var(--white);
}
</style>
