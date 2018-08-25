<template>
    <div class="card">
        <div class="meta-fields">
            <p>{{ question.id }}</p>
        </div>
        <div class="content">
            <h2>{{question.title}}</h2>
            <p>{{ question.body }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        question: Object
    }
}
</script>

<style scoped>

.card {
    position: relative;
    display: grid;
    grid-template-columns: 50px auto;
    margin: 10px 0px;
}

.card div > *:first-child {
    margin-top: 0;
    line-height: 24px;
}

</style>

