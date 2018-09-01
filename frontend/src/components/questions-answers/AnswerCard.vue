<template>
    <Card>
        <div class="card-content">
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
    </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: { Card },
  props: {
    answer: Object
  }
}
</script>

<style scoped>
@import '../../css/card.less';
</style>
