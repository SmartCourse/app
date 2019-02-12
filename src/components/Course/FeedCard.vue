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
        <Semester v-if="session">
          {{ sessionShortName }}
        </Semester>
        <Badge v-if="pinned">
          FAQ
        </Badge>
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
import Badge from '@/components/Category/Badge'

export default {
  props: {
    title: String,
    likes: Number,
    published: String,
    user: Object,
    numResponses: { type: Number, default: 0 },
    pinned: Number,
    code: String,
    id: String,
    cardType: String,
    recommend: Boolean,
    // it's an id not a string, can be used
    // to index the sessions array
    session: Number
  },
  components: {
    Card,
    UserMini,
    Semester,
    Badge,
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
    },
    sessionShortName() {
      return this.$store.getters.sessions.length &&
        this.$store.getters.sessions[this.session - 1] &&
        this.$store.getters.sessions[this.session - 1].shortName
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
