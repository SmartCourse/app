<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="vote">&plus;</p>
                <p class="likes">{{ question.likes }}</p>
                <p class="vote">&minus;</p>
            </div>
            <div class="content">
                <router-link tag="h2" :to="{ name: 'question', params: { id: String(question.id) }}">
                    {{ question.title }}
                </router-link>
                <p>{{ question.body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png'"/>
                <p class="date">Asked: <time>{{ question.published }}</time></p>
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
    question: Object
  }
}
</script>

<style scoped>
@import '../../css/card.less';
</style>
