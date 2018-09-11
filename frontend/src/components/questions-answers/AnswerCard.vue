<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="vote">&plus;</p>
                <p class="likes">{{ answer.likes }}</p>
                <p class="vote">&minus;</p>
            </div>
            <div class="content">
                <p>{{ answer.body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-3.png'"/>
                <p class="date">Answered: <time>{{ answer.published }}</time></p>
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
    answer: Object
  }
}
</script>

<style scoped src='../../css/card.less'>
</style>
