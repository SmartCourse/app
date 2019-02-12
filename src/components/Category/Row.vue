<template>
    <div class="row">
        <h4>{{ title }}</h4>
        <p>{{ body }}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    body: [String, Number]
  }
}
</script>

<style scoped>
h4, p {
    margin: 0;
}

.row {
    margin: 10px 0;
}
</style>
