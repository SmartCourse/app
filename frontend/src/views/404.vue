<template>
    <div class="main-content">
        <div class="container">
            <h1><i class="material-icons">warning</i></h1>
            <h1>Page Not Found</h1>
            <p>Oops, it looks like the page you're looking for doesn't exist!</p>
        </div>
    </div>
</template>

<style scoped>

.main-content {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.container {
    margin: auto;
    width: 80%;
}

.material-icons {
    font-size: inherit;
    display: inline-block;
    vertical-align: middle;
}

h1 {
    font: var(--header-1);
}

p {
    font: var(--header-4);
}

</style>
