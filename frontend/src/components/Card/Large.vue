<template>
    <Card>
        <div v-if="title" class="space-between">
            <CardHeader >{{ title }}</CardHeader>
             <!-- Add badges here in future -->
            <slot/>
        </div>
        <!-- User block -->
        <User v-bind="user" :published="published"/>
        <!-- Content block and user interaction -->
        <div class="content">
            <Vote v-bind="vote" />
            <p>{{ body }}</p>
        </div>
    </Card>
</template>

<script>
import Card from '.'
import CardHeader from './Header'
import User from '@/components/User/Summary'
import Vote from '@/components/Vote'

export default {
  components: {
    Card,
    CardHeader,
    User,
    Vote
  },
  props: {
    /* post title */
    title: String,
    /* post body */
    body: String,
    /* post vote object, verify at lower level */
    vote: Object,
    /* user object, verify at lower level */
    user: Object,
    /* Date string */
    published: String
  }
}
</script>

<style scoped>
.content {
    display: grid;
    grid-template-columns: 45px auto;
    grid-gap: 10px;
}

.space-between {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

p {
    margin: 10px 0;
    font: var(--body-copy-2);
    padding: 5px;
}
</style>
