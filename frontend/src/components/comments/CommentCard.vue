<template>
    <Card>
        <div class="card-content">
            <div class="meta-fields">
                <p class="vote">&plus;</p>
                <p class="likes">{{ comment.likes }}</p>
                <p class="vote">&minus;</p>
            </div>
            <div class="content">
                <p>{{ comment.body }}</p>
            </div>
            <aside class="user">
                <User :image="'https://travis-ci.com/images/logos/TravisCI-Mascot-3.png'"/>
                <p class="date">Posted: <time>{{ comment.published }}</time></p>
            </aside>
        </div>
    </Card>
</template>

<script>
import Card from '@/components/Card'
import User from '@/components/UserSummary'

export default {
  components: { Card, User },
  props: {
    comment: Object
  }
}
</script>

<style scoped src='../../css/card.less'>
</style>
