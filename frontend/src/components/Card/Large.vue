<template>
    <Card>
        <CardHeader>{{ title }}</CardHeader>
        <!-- User block -->
        <User :name="'Alex Hinds'" :published="'10 days'"/>
        <div class="content">
            <Votes :likes="10" :upvote="() => {}" :downvote="() => {}" />
            <p>{{ body }}</p>
        </div>
    </Card>
</template>

<script>
import Card from '.'
import CardHeader from './Header'
import User from '@/components/User/Summary'
import Votes from '@/components/Vote'

export default {
  components: {
    Card,
    CardHeader,
    User,
    Votes
  },
  props: {
    title: String,
    body: String
  }
}
</script>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 45px auto;
    grid-gap: 10px;
}

p {
    padding: 5px;
}
</style>
