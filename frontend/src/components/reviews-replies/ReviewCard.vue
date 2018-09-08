<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="arrow">&#8679;</p>
                <p class="likes">{{ review.likes }}</p>
                <p class="arrow">&#8681;</p>
            </div>
            <div class="content">
                <router-link tag="h2" :to="{ name: 'review', params: { id: String(review.id) }}">
                    {{ review.title }}
                </router-link>
                <p>{{ review.body }}</p>
            </div>
            <aside class="date">
                <time>{{ review.published }}</time>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: { Card },
  props: {
    review: Object
  }
}
</script>

<style scoped>
@import '../../css/card.less';
</style>
