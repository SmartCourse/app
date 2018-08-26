<template>
    <div class="card">
        <div class="meta-fields">
            <p>{{ answer.id }}</p>
        </div>
        <div class="content">
            <h3>{{ answer.title }}</h3>
            <p>{{ answer.body }}</p>
        </div>
        <aside class="date">
            <time>{{ answer.published }}</time>
        </aside>
    </div>
</template>

<script>
export default {
  props: {
    answer: Object
  }
}
</script>

<style scoped>
.date {
  font-size: 0.75em;
  color: rgba(0, 0, 0, 0.65);
}

.card {
  position: relative;
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-gap: 10px;
  margin: 10px 0px;
  border: 2px solid #f5f5f5;
  padding: 10px;
}

h2:hover {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}

.card div > *:first-child {
  margin-top: 0;
  line-height: 24px;
}
</style>

