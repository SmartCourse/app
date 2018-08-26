<template>
    <Card>
        <div class="meta-fields">
            <p>{{ question.id }}</p>
        </div>
        <div class="content">
            <router-link tag="h2" :to="{ name: 'question', params: { id: String(question.id) }}">
                {{ question.title }}
            </router-link>
            <p>{{ question.body }}</p>
        </div>
        <aside class="date">
            <time>{{ question.published }}</time>
        </aside>
    </Card>
</template>

<script>
import Card from './Card'

export default {
  components: { Card },
  props: {
    question: Object
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

