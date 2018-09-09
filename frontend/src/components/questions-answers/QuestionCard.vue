<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="vote">&plus;</p>
                <p class="likes">{{ likes }}</p>
                <p class="vote">&minus;</p>
            </div>
            <div class="content">
                <router-link tag="h2" :to="{ name: 'question', query: { qid: String(id) }}">
                    {{ title }}
                </router-link>
                <p>{{ body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <p class="date">Asked: <time>{{ published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from './UserSummary'

export default {
  components: { Card, User },
  props: {
    id: Number,
    author: Number,
    likes: Number,
    title: String,
    body: String,
    published: String
  }
}
</script>

<style scoped src='../../css/card.less'>
</style>
