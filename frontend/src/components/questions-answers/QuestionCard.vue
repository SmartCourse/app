<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="arrow">&#8679;</p>
                <p class="likes">{{ likes }}</p>
                <p class="arrow">&#8681;</p>
            </div>
            <div class="content">
                <router-link tag="h2" :to="{ name: 'question', params: { id: String(id) }}">
                    {{ title }}
                </router-link>
                <p>{{ body }}</p>
            </div>
            <aside class="date">
                <time>{{ published }}</time>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: { Card },
  props: {
    id: Number,
    author: Number,
    likes: Number,
    title: String,
    body: String,
    published: Date
  }
}
</script>

<style scoped>
@import '../../css/card.less';
</style>
