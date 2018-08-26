<template>
    <Card>
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
    </Card>
</template>

<script>
import Card from './Card'

export default {
  components: { Card },
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

h2:hover {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}
</style>

