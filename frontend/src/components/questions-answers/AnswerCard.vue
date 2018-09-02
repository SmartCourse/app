<template>
    <Card>
        <div class="card-content">
        <div class="meta-fields">
            <p class="arrow">&#8679;</p>
            <p class="likes">{{ answer.likes }}</p>
            <p class="arrow">&#8681;</p>
        </div>
        <div class="content">
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
