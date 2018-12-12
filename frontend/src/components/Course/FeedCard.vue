<template>
  <Card class="feed-card">
    <UserMini v-if="user" :name="user.displayName" :id="user.id" :picture="user.picture" />
    <div class="info">
      <div class="key-info">
        <SecondHeader :routeName="routeName" :code="code" :id="id">
          {{ title }}
        </SecondHeader>
        <p>
            <span v-if="numResponses === 0">
              {{ cardType === 'Question'
                ? 'Know the answer to this question?'
                : 'Have a response to this review?'
              }}
            </span>
            <span v-else>{{ numResponses }} Response{{ numResponses > 1 ? 's' : '' }}</span>
        </p>
      </div>
      <p class="published">
        <time>{{ published }}</time>
      </p>
      <div class="categories">
        <Recommend :recommend="recommend" v-if="cardType === 'Review'">
          {{ positiveOrNegativeText }}
        </Recommend>
        <Semester>
          {{ teachingPeriod }}
        </Semester>
      </div>
      <p class="likes">{{ likes > 0 && likes || 0 }} user{{ likes != 1 ? 's' : ''}} found this helpful</p>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/Card'
import SecondHeader from '@/components/Card/SecondaryHeader'
import UserMini from '@/components/User/Mini'
import Recommend from '@/components/Category/Recommend'
import Semester from '@/components/Category/Semester'

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    user: Object,
    numResponses: { type: Number, default: 0 },
    code: String,
    id: String,
    cardType: String,
    recommend: Boolean,
    teachingPeriod: { type: String, default: '18s2' }
  },
  components: {
    Card,
    UserMini,
    Semester,
    Recommend,
    SecondHeader
  },
  computed: {
    /* TODO use recommendation */
    routeName() {
      return this.cardType === 'Review' ? 'review' : 'question'
    },
    positiveOrNegativeText() {
      return this.recommend ? 'Recommended' : 'Not Recommended'
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

.categories {
  display: flex;
  align-items: center;
}

.categories > * {
  margin-right: 5px;
}

p {
  margin: 0;
  font: var(--body-copy-2);
}

.user:hover {
  cursor: pointer;
  opacity: 0.5;
}

@media screen and (max-width: 500px) {
  .info {
    grid-gap: 5px;
    grid-template-columns: 1fr 100px;
  }
  .likes {
    display: none;
  }
}
</style>
