<template>
    <div class="article">
        <!-- content -->
        <slot/>
    </div>
</template>

<style scoped>

.article {
    margin: 0 20px 20px;
    padding: 0 20px 20px;
}

.article > h1 {
    font: var(--header-1);
}

.article > h2 {
    font: var(--header-2);
}

@media screen and (max-width: 600px) {
    .article > h1 {
        font: var(--header-1-mobile);
    }

    .article > h2 {
        font: var(--header-2-mobile);
    }
}

</style>
