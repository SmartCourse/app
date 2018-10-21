<template>
  <Card class="feed-card">
    <UserMini v-if="user" :name="user.displayName" :id="user.id" :picture="user.picture" />
    <div class="info">
      <SecondHeader :routeName="routeName" :code="code" :id="id">
        {{ title }}
      </SecondHeader>
      <p class="published">
        <time>{{ published }}</time>
      </p>
      <Category :recommend="recommend" v-if="cardType === 'Review'"/>
      <p v-else>
        <span v-if="numAnswers === 0">Know the answer to this question?</span>
        <span v-else>{{ numAnswers }} Answer{{ numAnswers > 1 ? 's' : '' }}</span>
      </p>
      <p class="likes">{{ likes > 0 && likes || 0 }} user{{ likes != 1 ? 's' : ''}} found this helpful</p>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import SecondHeader from '@/components/Card/SecondaryHeader'
import UserMini from '@/components/User/Mini'
import Category from '@/components/Category'

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    user: Object,
    numAnswers: {type: Number, default: 0},
    code: String,
    id: String,
    cardType: String,
    recommend: Boolean
  },
  components: {
    Card,
    UserMini,
    Category,
    SecondHeader
  },
  computed: {
    /* TODO use recommendation */
    routeName() {
      return this.cardType === 'Review' ? 'review' : 'question'
    }
  }
}
</script>

<style scoped>

.feed-card {
  border-radius: 0;
  min-width: 310px;
  display: grid;
  grid-template-columns: 50px 1fr;
  margin: 0;
  grid-gap: 10px;
}

.info {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 200px;
}

.published, .likes {
  text-align: right;
}

p {
  margin: 0 5px;
  font: var(--body-copy-2);
}

.user:hover {
  cursor: pointer;
  opacity: 0.5;
}

@media screen and (max-width: 500px) {
  .info {
    grid-gap: 5px;
    grid-template-columns: 1fr 60px;
  }
  .likes {
    display: none;
  }

}

</style>
