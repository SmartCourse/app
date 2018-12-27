<template>
    <Card>
        <div v-if="title" class="space-between">
            <CardHeader >{{ title }}</CardHeader>
             <!-- Add badges here in future -->
            <slot/>
        </div>
<<<<<<< HEAD
        <InteractionMenu class="top-right" />
=======
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
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
<<<<<<< HEAD
import InteractionMenu from '@/components/Interactions/Menu'
=======
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7

export default {
  components: {
    Card,
    CardHeader,
    User,
<<<<<<< HEAD
    Vote,
    InteractionMenu
=======
    Vote
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
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
<<<<<<< HEAD
    padding: 5px;
}

.top-right {
    top: 17px;
    right: 0;
}

@media screen and (max-width: 600px) {
    .space-between {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 10px;
    }
}
=======
    font: var(--body-copy-2);
    padding: 5px;
}
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
</style>
